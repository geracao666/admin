import { PrismaClient } from '@prisma/client'

export async function GET() {
  const prisma = new PrismaClient()

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