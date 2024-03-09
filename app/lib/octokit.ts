import { Octokit } from 'octokit';
import { GITHUB_API_TOKEN } from '../config/github';

const octokitSingleton = () => new Octokit({ auth: GITHUB_API_TOKEN })

declare global {
  var octokit: undefined | ReturnType<typeof octokitSingleton>
}

const octokit = globalThis.octokit ?? octokitSingleton()

export default octokit

if (process.env.NODE_ENV !== 'production') globalThis.octokit = octokit