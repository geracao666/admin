import { getTags } from "../tag.service"

export async function GET() {
  const tags = await getTags()
  return Response.json(tags)
}