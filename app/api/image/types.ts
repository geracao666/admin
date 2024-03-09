import { GitHubFileUploadResponse } from "../github/types"

export type ImageUploadOptions = {
  shaFromContent?: boolean
}

export type ImageUploadResponse = [string, GitHubFileUploadResponse | null]