import { useState, useEffect, RefObject } from 'react';

/**
 *
 * @param ref
 * @param rootMargin
 * @returns
 */
export const useOnScreen = (ref: RefObject<any>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  /**
   *
   * @param entry
   */
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setIntersecting(entry.isIntersecting);
  };

  /**
   *
   */
  useEffect(() => {
    const node = ref?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = {
      threshold: 0.1,
      root: null,
    };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, rootMargin]);

  return isIntersecting;
};
