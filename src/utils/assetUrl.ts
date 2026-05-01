export const getAssetUrl = (path: string | undefined): string | undefined => {
  if (!path) return path;
  
  // If the path already has a protocol or starts with a data URI, return it as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Remove leading slash to avoid double slashes when joining with BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // BASE_URL will be '/Portfolio/' in production, '/' in dev
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
