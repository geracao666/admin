import octokit from '@/app/lib/octokit'
import { RateLimiter, RateLimiterOpts } from 'limiter'
import GitHubAPILimitReachedError from './GitHubAPILimitReachedError'
import { GITHUB_API_RATE_LIMIT, GITHUB_COMMITTER } from '@/app/config/github'
import { GitHubFileUploadParams, GitHubGetFileParams } from './types'
import { RequestError } from 'octokit'

/**
 * Limiter used to keep track of GitHub API calls.
 */
const limiter = new RateLimiter({
  ...GITHUB_API_RATE_LIMIT,
  fireImmediately: true
} as RateLimiterOpts)

/**
 * Remove 1 token from the rate limiter.
 */
const removeToken = async () => {
  const remainingRequests = await limiter.removeTokens(1)
  if (remainingRequests < 0) {
    throw new GitHubAPILimitReachedError()
  }
}

/**
 * Get the SHA of a file using the GitHub API.
 */
const getFileSHA = async (params: GitHubGetFileParams) => {
  try {
    await removeToken()
    const { data } = await octokit.rest.repos.getContent(params)

    if (Array.isArray(data)) {
      const [item] = data
      return item.sha
    }

    return data.sha
  } catch (err) {
    if (err instanceof RequestError && err.status === 404) {
      return null
    }

    throw err
  }
}

/**
 * Upload a file using the GitHub API.
 */
export const uploadFile = async (params: GitHubFileUploadParams) => {
  const { repo, owner, path } = params
  const sha = params.sha ?? await getFileSHA({ repo, owner, path })

  await removeToken()
  return await octokit.rest.repos.createOrUpdateFileContents({
    committer: GITHUB_COMMITTER,
    ...params,
    ...(sha ? { sha } : {})
  })
}