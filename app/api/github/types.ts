import { Endpoints } from '@octokit/types'

export type GitHubGetFileParams = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["parameters"]

export type GitHubFileUploadParams = Endpoints["PUT /repos/{owner}/{repo}/contents/{path}"]["parameters"]
export type GitHubFileUploadResponse = Endpoints["PUT /repos/{owner}/{repo}/contents/{path}"]["response"]