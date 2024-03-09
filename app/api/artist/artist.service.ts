import { ArtistPayload, ReleasePayload } from "./types";
import createSlug from "@/app/utils/createSlug";
import prisma from '@/app/lib/prisma'
import ArtistAlreadyExistsError from "./ArtistAlreadyExistsError";
import { uploadArtworkImage, uploadCoverImage } from "../image/image.service";

const connectOrCreateTags = (tags: string[]) => ({
  connectOrCreate: tags.map((name: string) => ({
    where: { name },
    create: { name }
  }))
})

// TODO: Make releases unique by a conjunction of release name and artists.
// TODO: Make discs and tracks unique too.
const makeRelease = async (
  artistName: string,
  artistSlug: string,
  release: ReleasePayload,
  shaFromContent: boolean = false
) => {
  const [artwork] = await uploadArtworkImage(artistName, artistSlug, release, {
    shaFromContent
  })

  return {
    artwork,
    name: release.name,
    downloadUrl: release.downloadUrl,
    type: {
      connect: { name: release.type }
    },
    discs: {
      create: release.tracks.map((discTracks: string[], discIndex: number) => ({
        number: discIndex + 1,
        tracks: {
          create: discTracks.map((name, trackIndex) => ({
            name,
            number: trackIndex + 1
          }))
        }
      }))
    }
  }
}

const createReleases = async (
  artistName: string,
  artistSlug: string,
  releases: ReleasePayload[],
  shaFromContent: boolean = false
) => {
  return {
    create: await Promise.all(
      releases.map((release) => makeRelease(
        artistName,
        artistSlug,
        release,
        shaFromContent
      ))
    )
  }
}

export const artistExists = (slug: string) => {
  return prisma.artist.findFirst({
    where: { slug }
  })
}

export const createArtist = async (
  payload: ArtistPayload,
  options: { shaFromPayload: boolean } = { shaFromPayload: false }
) => {
  const slug = createSlug(payload.name)
  if (await artistExists(slug)) {
    throw new ArtistAlreadyExistsError(payload)
  }

  const [cover] = await uploadCoverImage(payload.name, slug, payload.cover, {
    shaFromContent: options.shaFromPayload
  })

  const entity = {
    slug,
    cover,
    name: payload.name,
    origin: payload.origin,
    tags: connectOrCreateTags(payload.tags),
    releases: await createReleases(payload.name, slug, payload.releases, options.shaFromPayload)
  }

  return await prisma.artist.upsert({
    where: {
      slug,
      name: entity.name,
    },
    update: { ...entity },
    create: { ...entity }
  })
}