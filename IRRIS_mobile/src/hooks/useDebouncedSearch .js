import { useCallback, useRef } from 'react';

const useDebouncedSearch = (searchFunction, delay) => {
  const debounceTimer = useRef();

  const debouncedSearch = useCallback(
    (...args) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        searchFunction(...args);
      }, delay);
    },
    [searchFunction, delay],
  );

  return debouncedSearch;
};

export default useDebouncedSearch;
