import { useEffect, useState } from 'react';

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

function getPageSize(width) {
  if (width >= DESKTOP_BREAKPOINT) return 10;
  if (width >= TABLET_BREAKPOINT) return 8;
  return 6;
}

export default function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(() =>
    typeof window === 'undefined' ? 10 : getPageSize(window.innerWidth)
  );

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize(window.innerWidth));
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return pageSize;
}
