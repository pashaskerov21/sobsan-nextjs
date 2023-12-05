/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: process.env.BASE_URL
    },
    compiler: {
        styledComponents: true
    },
}



module.exports = nextConfig;
