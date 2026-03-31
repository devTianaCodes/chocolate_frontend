export function getEffectivePrice(item) {
  return Number(item?.discount_price) > 0
    ? Number(item.discount_price)
    : Number(item?.price || 0);
}
