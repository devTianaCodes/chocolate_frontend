const DEFAULT_SCROLL_OFFSET = 120;

export function scrollToSection(element, offset = DEFAULT_SCROLL_OFFSET) {
  if (!element) return;

  const top = Math.max(0, window.scrollY + element.getBoundingClientRect().top - offset);
  window.scrollTo({ top, behavior: 'smooth' });
}
