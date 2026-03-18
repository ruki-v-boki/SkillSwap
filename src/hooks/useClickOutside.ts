import { useEffect, type RefObject } from 'react';


export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  excludeRef?: RefObject<HTMLElement | null>
) {

// ---------------------------------------------------------------

  useEffect(() => {
    if (typeof handler !== 'function') return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (excludeRef?.current?.contains(target)) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

// ---------------------------------------------------------------

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, handler, excludeRef]);
}