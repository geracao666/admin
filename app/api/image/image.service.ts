import path from "path"
import { uploadFile } from "../github/github.service"
import { ReleasePayload } from "../artist/types"
import createSlug from "@/app/utils/createSlug"
import { ImageUploadOptions, ImageUploadResponse } from "./types"
import { getBlobSHA } from "@/app/utils/hash"

/**
 * The repository which the images will be uploaded.
 */
const IMAGE_REPOSITORY = {
  repo: 'images',
  owner: 'geracao666',
  branch: 'main',
}

const getArtistDir = (artistSlug: string) => {
  const firstChar = artistSlug.charAt(0)
  const dir = /[a-z]/.test(firstChar) ? firstChar : '0-9'

  return path.join(dir, artistSlug)
}

const getCoverPath = (artistSlug: string) => {
  const dir = getArtistDir(artistSlug)
  return path.join(dir, 'cover.jpg')
}

const getArtworkPath = (artistSlug: string, release: ReleasePayload) => {
  const dir = getArtistDir(artistSlug)
  const artworkSlug = createSlug(release.name)

  return path.join(dir, 'artworks', `${artworkSlug}.jpg`)
}

export const uploadCoverImage = async (
  artistName: string,
  artistSlug: string,
  coverBase64: string,
  { shaFromContent = false }: ImageUploadOptions = {}
): Promise<ImageUploadResponse> => {
  const coverPath = getCoverPath(artistSlug)
  const sha = shaFromContent && getBlobSHA(coverBase64)
  const commit = {
    ...IMAGE_REPOSITORY,
    ...(sha ? { sha } : {}),
    path: coverPath,
    content: coverBase64,
    message: `:framed_picture: Upload "${artistName}" cover image.`,
  }

  return [coverPath, await uploadFile(commit)]
}

export const uploadArtworkImage = async (
  artistName: string,
  artistSlug: string,
  release: ReleasePayload,
  { shaFromContent = false }: ImageUploadOptions = {}
): Promise<ImageUploadResponse> => {
  const artworkPath = getArtworkPath(artistSlug, release)
  const sha = shaFromContent && getBlobSHA(release.artwork)
  const commit = {
    ...IMAGE_REPOSITORY,
    ...(sha ? { sha } : {}),
    path: artworkPath,
    content: release.artwork,
    message: `:art: Upload ${artistName}'s "${release.name}" artwork image.`,
  }

  return [artworkPath, await uploadFile(commit)]
}