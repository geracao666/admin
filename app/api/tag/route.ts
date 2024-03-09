import prisma from '@/app/lib/prisma'

export async function GET() {
  try {
    const tags = await prisma.tag.findMany()
    return Response.json(tags)
  } catch (err) {
    // TODO: Handle error correctly
    console.log('Error while retrieving tags:', err)
  }
}