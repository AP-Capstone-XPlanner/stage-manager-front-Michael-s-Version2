import { useEffect } from 'react';
import { handleGlobalKeyDown } from '../utils/globalKeyboard';

export function useKeyboardShortcuts() {
  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, []);
}
