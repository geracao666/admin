const IS_DEV = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: IS_DEV ? 'standalone' : 'export'
}

module.exports = nextConfig
