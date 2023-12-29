import { PrismaClient } from '@prisma/client'

export async function POST(request: Request) {
  const prisma = new PrismaClient()
  const data = await request.json()

  try {
    const artist = await prisma.artist.create({ data })
    return Response.json(artist)
  } catch (err) {
    // TODO: Handle error correctly
    console.log('Error while creating artist:', err)
  } finally {
    await prisma.$disconnect()
  }
}