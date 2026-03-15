import { useEffect, type RefObject } from 'react';


export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  excludeRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (excludeRef?.current?.contains(target)) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, excludeRef]);
}