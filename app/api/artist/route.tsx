import prisma from '@/app/lib/prisma'

export async function POST(request: Request) {
  const data = await request.json()

  try {
    const artist = await prisma.artist.create({
      data: {
        ...data,
        genres: {
          connect: data.genres?.map((id: number) => ({ id }))
        }
      }
    })

    return Response.json(artist)
  } catch (err) {
    // TODO: Handle error correctly
    console.log('Error while creating artist:', err)
  } finally {
    await prisma.$disconnect()
  }
}