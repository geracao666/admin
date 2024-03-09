import { hashSync } from "hasha"

/**
 * Get the blob SHA from a base64 string.
 */
export const getBlobSHA = (str: string) => {
  const binary = Buffer.from(str, 'base64')
  return hashSync([`blob ${binary.length}\0`, binary], { algorithm: 'sha1' })
}