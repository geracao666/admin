export default class GitHubAPILimitReachedError extends Error {
  constructor(message: string = 'GitHub API calls have reached its limit') {
    super(message)
    Object.setPrototypeOf(this, GitHubAPILimitReachedError.prototype)
  }
}