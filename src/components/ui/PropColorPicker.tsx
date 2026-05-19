import { COLOR_PRESETS } from '../../constants/propColors';
import { getDefaultPropColor } from '../../constants/propColors';
import type { PropType } from '../../types';

interface PropColorPickerProps {
  color: string;
  propType: PropType;
  onChange: (color: string) => void;
}

export function PropColorPicker({ color, propType, onChange }: PropColorPickerProps) {
  return (
    <div className="color-picker">
      <label className="color-picker-row">
        <span>Color</span>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Prop color"
        />
        <input
          type="text"
          className="color-hex-input"
          value={color}
          maxLength={7}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      </label>
      <div className="color-presets">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`color-swatch ${color.toLowerCase() === preset ? 'active' : ''}`}
            style={{ background: preset }}
            title={preset}
            aria-label={`Set color ${preset}`}
            onClick={() => onChange(preset)}
          />
        ))}
        <button
          type="button"
          className="color-swatch reset"
          title="Reset to default"
          aria-label="Reset to default color"
          onClick={() => onChange(getDefaultPropColor(propType))}
        >
          ↺
        </button>
      </div>
    </div>
  );
}
