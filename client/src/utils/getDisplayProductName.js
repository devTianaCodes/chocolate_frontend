export function getDisplayProductName(name) {
  if (!name) return '';
  return name.replace(/\s+No\.\s*\d+$/i, '');
}
