import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        cssChunking: false
    },
    reactCompiler: true
};

export default nextConfig;
