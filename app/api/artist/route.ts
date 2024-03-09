import { createArtist } from './artist.service'
import ArtistAlreadyExistsError from './ArtistAlreadyExistsError'
import { StatusCodes } from 'http-status-codes'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const artist = await createArtist(payload)

    return Response.json(artist)
  } catch (err) {
    if (err instanceof ArtistAlreadyExistsError) {
      return Response.json(
        { error: err.message },
        { status: StatusCodes.CONFLICT }
      )
    }

    throw err
  }
}