module.exports = (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        /* config options here */
        basePath: '/myAIGC',
        assetPrefix: '/myAIGC',
        exportPathMap: async function () {
            return {
                '/': { page: '/' },
                '/api/generate': { page: '/api/generate' }
            }
        }
    }
    return nextConfig
}