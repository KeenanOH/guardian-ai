/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default withPWA(nextConfig);
