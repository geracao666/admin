import prisma from '@/app/lib/prisma'

export async function GET() {
  try {
    const genres = await prisma.genre.findMany()
    return Response.json(genres)
  } catch (err) {
    // TODO: Handle error correctly
    console.log('Error while retrieving genres:', err)
  } finally {
    await prisma.$disconnect()
  }
}