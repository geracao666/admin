export const GITHUB_COMMITTER = {
  name: process.env.GITHUB_USER_NAME ?? '',
  email: process.env.GITHUB_USER_EMAIL ?? ''
}

export const GITHUB_API_RATE_LIMIT = {
  interval: 'hour',
  tokensPerInterval: 5000
}

export const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN || ''