import {useEffect, useState} from 'react';

export const useDebounce = (value: string, delay = 500): string => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handleDebounce);
  }, [value, delay]);

  return debounced;
};
