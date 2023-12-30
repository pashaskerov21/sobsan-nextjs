/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: process.env.BASE_URL
    },
    compiler: {
        styledComponents: {
            ssr: true,
            displayName: true,
            pure: true,
            minify: true,
        }
    },
}



module.exports = nextConfig;
