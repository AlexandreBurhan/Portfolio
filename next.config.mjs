// Empty for a site at the domain root; '/Portfolio' for a GitHub Pages project
// site. Set by the deploy workflow from actions/configure-pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
