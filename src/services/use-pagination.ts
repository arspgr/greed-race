import { useCallback, useMemo, useState } from 'react';

export function usePagination(next: number | undefined, onPage: (page?: number) => void) {
  const [pages, setPages] = useState<(number | undefined)[]>([]);
  const page = useMemo(() => pages[pages.length - 1], [pages]);
  const prev = useMemo(() => pages[pages.length - 2], [pages]);

  const goPrevPage = useCallback(() => {
    setPages(p => p.slice(0, -1));
    onPage(prev);
  }, [setPages, prev, onPage]);

  const goNextPage = useCallback(() => {
    setPages(p => p.concat(next));
    onPage(next);
  }, [setPages, next, onPage]);

  const resetPage = useCallback(() => setPages([]), [setPages]);

  return {
    page,
    prev,
    goPrevPage,
    goNextPage,
    resetPage,
  };
}
