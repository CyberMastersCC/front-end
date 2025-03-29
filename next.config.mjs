/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000'
    },
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: undefined,
    }
  
    
  }
  
  export default nextConfig