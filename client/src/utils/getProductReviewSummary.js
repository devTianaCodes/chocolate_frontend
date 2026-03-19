export function getProductReviewSummary(productId) {
  const seed = Number(productId) || 1;
  const rating = Math.max(3, Math.min(5, 3 + (seed % 3)));
  const count = 120 + seed * 17;

  return { rating, count };
}
