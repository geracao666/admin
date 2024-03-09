import { getArtistBySlug, getArtistsSlugs } from "../artist.service"

export async function generateStaticParams() {
  return await getArtistsSlugs()
}

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const artist = await getArtistBySlug(params.slug)
  return Response.json(artist)
}