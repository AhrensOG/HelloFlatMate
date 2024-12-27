import createNextIntPlugin from "next-intl/plugin";
const withNextIntl = createNextIntPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "th.bing.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "static.spotahome.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
        unoptimized: true, // Desactiva la optimización de imágenes
    },
};

export default withNextIntl(nextConfig);
