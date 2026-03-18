export function parsePageParam(value) {
  const page = Number.parseInt(value || '1', 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}

export function getTotalPages(count, pageSize) {
  if (count <= 0) return 1;
  return Math.ceil(count / pageSize);
}

export function paginateItems(items, currentPage, pageSize) {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getVisiblePageNumbers(currentPage, totalPages, maxVisible = 5) {
  const visible = Math.min(maxVisible, totalPages);
  const half = Math.floor(visible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + visible - 1);

  start = Math.max(1, end - visible + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
