/**
 * Resolve an image path for the current deployment environment.
 *
 * Data files always use absolute paths like `/images/subject/file.png`.
 * When hosted on GitHub Pages with a repo name, we need to prepend
 * import.meta.env.BASE_URL so the browser requests the correct URL.
 *
 * @param path The raw image path from question data
 * @returns The environment-corrected path
 */
export const resolveImagePath = (path: string | undefined): string | undefined => {
  if (!path) return path;

  // External URLs (http:// or https://) pass through untouched
  if (path.startsWith('http')) {
    return path;
  }

  // Absolute paths like /images/... need BASE_URL prepended
  if (path.startsWith('/')) {
    // import.meta.env.BASE_URL already ends with / when configured
    // e.g. "/cswstudying/" + "images/chemistry/file.png"
    const base = import.meta.env.BASE_URL;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return base + cleanPath;
  }

  // Relative paths pass through unchanged
  return path;
};
