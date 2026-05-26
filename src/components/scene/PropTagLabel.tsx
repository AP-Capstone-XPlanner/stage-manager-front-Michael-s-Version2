import type { MouseEvent, PointerEvent } from 'react';
import { Html } from '@react-three/drei';
import { PROP_TAG_LABEL_Y } from '../../constants/propLabels';

/** Unified selection indicator — bright red. */
export const PROP_SELECTION_MARKER_COLOR = '#ff4040';

export function PropTagLabel({
  tag,
  selected = false,
  onSelect,
}: {
  tag: string;
  selected?: boolean;
  /** When set and tag is non-empty, clicking the tag selects this prop. */
  onSelect?: () => void;
}) {
  const trimmed = tag.trim();
  if (!trimmed && !selected) return null;

  const clickable = Boolean(trimmed && onSelect);

  const handlePointer = (event: PointerEvent) => {
    event.stopPropagation();
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    onSelect?.();
  };

  return (
    <Html
      position={[0, PROP_TAG_LABEL_Y, 0]}
      center
      distanceFactor={10}
      zIndexRange={[200, 0]}
      pointerEvents={clickable ? 'auto' : 'none'}
    >
      <div
        className="prop-tag-stack"
        aria-label={selected ? 'Selected prop' : undefined}
      >
        {trimmed ? (
          <div
            className={`prop-tag-label ${clickable ? 'prop-tag-label--clickable' : ''}`}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onPointerDown={clickable ? handlePointer : undefined}
            onClick={clickable ? handleClick : undefined}
            onKeyDown={
              clickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect?.();
                    }
                  }
                : undefined
            }
          >
            {trimmed}
          </div>
        ) : null}
        {selected && <span className="prop-selection-marker" aria-hidden />}
      </div>
    </Html>
  );
}
