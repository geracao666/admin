import { PrismaClient } from '@prisma/client'

/**
 * Feed ReleaseTypes table.
 */
const RELEASE_TYPES = [
  'album',
  'compilation',
  'dvd',
  'ep',
  'live',
  'single',
  'split'
]

const prisma = new PrismaClient()

async function main() {
  try {
    for (const name of RELEASE_TYPES) {
      await prisma.releaseType.upsert({
        where: { name },
        update: { name },
        create: { name }
      })
    }
  } catch (err) {
    console.log('Error while seeding:', err)
  }
}

main()