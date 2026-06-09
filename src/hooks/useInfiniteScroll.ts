import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  onIntersect,
  hasNextPage,
  isLoading,
  threshold = 0.5,
  rootMargin = "100px",
}: UseInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNextPage && !isLoading) {
        onIntersect();
      }
    },
    [onIntersect, hasNextPage, isLoading],
  );

  useEffect(() => {
    const currentTarget = targetRef.current;

    if (!currentTarget) return;
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(currentTarget);

    return () => observer.disconnect();
  }, [handleIntersect, threshold, rootMargin, hasNextPage, isLoading]);

  return { targetRef };
};
