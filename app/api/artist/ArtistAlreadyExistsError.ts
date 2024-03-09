import { ArtistPayload } from "./types"

export default class ArtistAlreadyExistsError extends Error {
  constructor(artist: ArtistPayload) {
    super(`Artist already exists: ${artist.name}`)
    Object.setPrototypeOf(this, ArtistAlreadyExistsError.prototype)
  }
}