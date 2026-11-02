// Prefixes files from /public with the site's base path, so images and the CV
// still load when the site is served from a sub-folder (a GitHub Pages project
// site lives at /<repository>/). Next's <Link> handles this on its own; plain
// <img>, <video> and <a href> do not.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path) {
  return path && path.startsWith('/') ? `${basePath}${path}` : path;
}
