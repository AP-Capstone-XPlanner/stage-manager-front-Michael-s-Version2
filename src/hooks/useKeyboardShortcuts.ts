import { useEffect } from 'react';
import { KEYBOARD_MOVE_STEP, KEYBOARD_MOVE_STEP_FAST } from '../utils/propPosition';
import { useStageStore } from '../store/stageStore';

function isTextInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.tagName === 'TEXTAREA') return true;
  if (target.tagName === 'INPUT') {
    const type = (target as HTMLInputElement).type;
    return ['text', 'number', 'search', 'email', 'password'].includes(type);
  }
  return target.isContentEditable;
}

export function useKeyboardShortcuts() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTextInput(event.target)) return;

      const state = useStageStore.getState();
      const { selectedPropId, mode, cancelPlacement } = state;

      if (event.key === 'Escape' && mode === 'place') {
        cancelPlacement();
        return;
      }

      if (!selectedPropId) return;

      const step = event.shiftKey ? KEYBOARD_MOVE_STEP_FAST : KEYBOARD_MOVE_STEP;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          state.moveSelectedProp(-step, 0);
          break;
        case 'ArrowRight':
          event.preventDefault();
          state.moveSelectedProp(step, 0);
          break;
        case 'ArrowUp':
          event.preventDefault();
          state.moveSelectedProp(0, -step);
          break;
        case 'ArrowDown':
          event.preventDefault();
          state.moveSelectedProp(0, step);
          break;
        case 'PageUp':
          event.preventDefault();
          state.moveSelectedPropVertical(step);
          break;
        case 'PageDown':
          event.preventDefault();
          state.moveSelectedPropVertical(-step);
          break;
        case 'Delete':
        case 'Backspace':
          event.preventDefault();
          state.deleteSelectedProp();
          break;
        case 'r':
        case 'R':
          if (event.shiftKey) {
            state.rotateSelected(-Math.PI / 4);
          } else {
            state.rotateSelected(Math.PI / 4);
          }
          break;
        case 'h':
        case 'H':
          event.preventDefault();
          state.togglePropVisibility();
          break;
        case '[':
          event.preventDefault();
          state.setSelectedPropScale(
            (state.props.find((p) => p.id === selectedPropId)?.scale ?? 1) - 0.1,
          );
          break;
        case ']':
          event.preventDefault();
          state.setSelectedPropScale(
            (state.props.find((p) => p.id === selectedPropId)?.scale ?? 1) + 0.1,
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
