import { StatusCodes } from "http-status-codes"
import ArtistAlreadyExistsError from "../ArtistAlreadyExistsError"
import { createArtist } from "../artist.service"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const artist = await createArtist(payload, {
      shaFromPayload: true
    })

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