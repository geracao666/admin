export type ArtistPayload = {
  name: string
  origin: string
  cover: string
  tags: string[]
  releases: ReleasePayload[]
}

export type ReleaseType = 'album' | 'compilation' | 'dvd' | 'ep' | 'live' | 'single' | 'split'
export type ReleasePayload = {
  type: ReleaseType
  name: string
  artwork: string
  downloadUrl: string
  tracks: string[][]
}