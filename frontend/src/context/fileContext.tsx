import { createContext } from 'react';

export const FileContext = createContext<{
  refreshFiles: (path?: string) => void;
}>({
  refreshFiles: () => {},
});