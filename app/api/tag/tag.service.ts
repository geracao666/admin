import prisma from '@/app/lib/prisma'

export const getTags = async () => {
  const tags = await prisma.tag.findMany({
    select:  { name: true }
  })

  return tags.map(({ name }) => name)
}

export const getArtistsByTag = async (name: string) => {
  const tag = await prisma.tag.findFirst({
    where: { name },
    select: {
      name: true,
      artists: {
        select: {
          slug: true
        }
      }
    }
  })

  if (!tag) {
    return null
  }

  return {
    ...tag,
    artists: tag.artists.map(({ slug }) => slug)
  }
}