import { getArtistsByTag, getTags } from "../tag.service"

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map(name => ({ name }))
}

export async function GET(
  _: Request,
  { params }: { params: { name: string } }
) {
  const artists = await getArtistsByTag(params.name)
  return Response.json(artists)
}