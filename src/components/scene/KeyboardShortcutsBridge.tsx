import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { handleGlobalKeyDown } from '../../utils/globalKeyboard';

/** Canvas capture fallback when the WebGL element holds focus. */
export function KeyboardShortcutsBridge() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const el = gl.domElement;
    const opts: AddEventListenerOptions = { capture: true };
    el.addEventListener('keydown', handleGlobalKeyDown, opts);
    return () => el.removeEventListener('keydown', handleGlobalKeyDown, opts);
  }, [gl]);

  return null;
}
