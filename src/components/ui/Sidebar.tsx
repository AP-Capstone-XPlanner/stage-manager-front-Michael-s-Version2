import { useEffect, useState } from 'react';
import {
  PROP_CATALOG,
  PROP_SCALE_LIMITS,
  PROP_TAG_MAX_LENGTH,
  STAGE_LIMITS,
} from '../../constants/props';
import { useStageStore } from '../../store/stageStore';
import {
  heightAboveStage,
  PROP_MAX_HEIGHT_ABOVE_STAGE,
  rotationDisplayDegrees,
} from '../../utils/propPosition';
import { PropColorPicker } from './PropColorPicker';
import { PropList } from './PropList';

function DimensionControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const decimals = step < 1 ? 1 : 0;
  const [inputText, setInputText] = useState(() => value.toFixed(decimals));

  useEffect(() => {
    setInputText(value.toFixed(decimals));
  }, [value, decimals]);

  const commitInput = () => {
    const parsed = parseFloat(inputText);
    const next = Number.isFinite(parsed) ? parsed : value;
    const clamped = Math.min(max, Math.max(min, next));
    onChange(clamped);
    setInputText(clamped.toFixed(decimals));
  };

  return (
    <label className="control-row">
      <div className="control-label">
        <span>{label}</span>
        <span className="control-value">
          {value.toFixed(decimals)} {unit}
        </span>
      </div>
      <div className="dimension-input-row">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <input
          type="number"
          className="dimension-number"
          min={min}
          max={max}
          step={step}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={commitInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commitInput();
            }
          }}
        />
      </div>
    </label>
  );
}

export function Sidebar() {
  const stage = useStageStore((s) => s.stage);
  const setStageDimension = useStageStore((s) => s.setStageDimension);
  const props = useStageStore((s) => s.props);
  const selectedPropId = useStageStore((s) => s.selectedPropId);
  const placementType = useStageStore((s) => s.placementType);
  const mode = useStageStore((s) => s.mode);
  const snapToGrid = useStageStore((s) => s.snapToGrid);
  const startPlacement = useStageStore((s) => s.startPlacement);
  const cancelPlacement = useStageStore((s) => s.cancelPlacement);
  const rotateSelected = useStageStore((s) => s.rotateSelected);
  const setSelectedPropPosition = useStageStore((s) => s.setSelectedPropPosition);
  const deleteSelectedProp = useStageStore((s) => s.deleteSelectedProp);
  const setSelectedPropScale = useStageStore((s) => s.setSelectedPropScale);
  const togglePropVisibility = useStageStore((s) => s.togglePropVisibility);
  const setSelectedPropTag = useStageStore((s) => s.setSelectedPropTag);
  const setSelectedPropColor = useStageStore((s) => s.setSelectedPropColor);
  const toggleSnap = useStageStore((s) => s.toggleSnap);
  const clearAllProps = useStageStore((s) => s.clearAllProps);
  const selectedProp = props.find((p) => p.id === selectedPropId);
  const hiddenCount = props.filter((p) => !p.visible).length;

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h1>Stage Pilot</h1>
        <p>Design your stage layout in 3D</p>
      </header>

      <section className="panel">
        <h2>Stage</h2>
        <p className="panel-hint">
          Set the platform size (meters). Length and width up to 40 m.
        </p>
        <DimensionControl
          label="Length"
          value={stage.length}
          min={STAGE_LIMITS.length.min}
          max={STAGE_LIMITS.length.max}
          step={0.5}
          unit="m"
          onChange={(v) => setStageDimension('length', v)}
        />
        <DimensionControl
          label="Width"
          value={stage.width}
          min={STAGE_LIMITS.width.min}
          max={STAGE_LIMITS.width.max}
          step={0.5}
          unit="m"
          onChange={(v) => setStageDimension('width', v)}
        />
        <DimensionControl
          label="Height"
          value={stage.height}
          min={STAGE_LIMITS.height.min}
          max={STAGE_LIMITS.height.max}
          step={0.1}
          unit="m"
          onChange={(v) => setStageDimension('height', v)}
        />
      </section>

      <section className="panel">
        <div className="panel-title-row">
          <h2>Props</h2>
          <label className="toggle">
            <input type="checkbox" checked={snapToGrid} onChange={toggleSnap} />
            Snap
          </label>
        </div>
        <p className="panel-hint">
          {mode === 'place'
            ? 'Click the stage to place. Esc to cancel.'
            : 'Pick a prop, click the stage to place. Drag selected props to move.'}
        </p>
        <div className="prop-grid">
          {PROP_CATALOG.map((item) => (
            <button
              key={item.type}
              type="button"
              className={`prop-card ${placementType === item.type ? 'active' : ''}`}
              onClick={() =>
                placementType === item.type
                  ? cancelPlacement()
                  : startPlacement(item.type)
              }
            >
              <span className="prop-icon">{item.icon}</span>
              <span className="prop-label">{item.label}</span>
            </button>
          ))}
        </div>
        {mode === 'place' && (
          <button type="button" className="btn secondary" onClick={cancelPlacement}>
            Cancel placement
          </button>
        )}
      </section>

      <PropList />

      {selectedProp && (
        <section className="panel">
          <h2>Selected</h2>
          <p className="panel-hint">
            {PROP_CATALOG.find((p) => p.type === selectedProp.type)?.label}
          </p>
          <label className="tag-field">
            <span>Tag / usage note</span>
            <input
              type="text"
              placeholder='e.g. "Host desk", "Camera 2"'
              value={selectedProp.tag}
              maxLength={PROP_TAG_MAX_LENGTH}
              onChange={(e) => setSelectedPropTag(e.target.value)}
            />
          </label>
          <p className="panel-hint tag-hint">
            Shown above the prop in 3D so your crew knows what it is for.
          </p>
          <PropColorPicker
            color={selectedProp.color}
            propType={selectedProp.type}
            onChange={setSelectedPropColor}
          />
          <div className="coords-panel">
            <p className="coords-title">Position (from stage center)</p>
            <div className="coords-grid">
              <label className="coord-field">
                <span>X</span>
                <input
                  type="number"
                  step={0.25}
                  value={Number(selectedProp.position[0].toFixed(2))}
                  onChange={(e) =>
                    setSelectedPropPosition(
                      parseFloat(e.target.value) || 0,
                      selectedProp.position[2],
                    )
                  }
                />
                <span className="coord-unit">m</span>
              </label>
              <label className="coord-field">
                <span>Z</span>
                <input
                  type="number"
                  step={0.25}
                  value={Number(selectedProp.position[2].toFixed(2))}
                  onChange={(e) =>
                    setSelectedPropPosition(
                      selectedProp.position[0],
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
                <span className="coord-unit">m</span>
              </label>
              <label className="coord-field">
                <span>Y</span>
                <input
                  type="number"
                  step={0.25}
                  min={0}
                  max={PROP_MAX_HEIGHT_ABOVE_STAGE}
                  value={Number(
                    heightAboveStage(selectedProp.position[1], stage.height).toFixed(2),
                  )}
                  onChange={(e) =>
                    setSelectedPropPosition(
                      selectedProp.position[0],
                      selectedProp.position[2],
                      stage.height + (parseFloat(e.target.value) || 0),
                    )
                  }
                />
                <span className="coord-unit">m up</span>
              </label>
              <div className="coord-readonly">
                <span>Rotation</span>
                <strong>
                  {rotationDisplayDegrees(selectedProp.rotation).toFixed(0)}°
                </strong>
              </div>
            </div>
          </div>
          <DimensionControl
            label="Size"
            value={selectedProp.scale}
            min={PROP_SCALE_LIMITS.min}
            max={PROP_SCALE_LIMITS.max}
            step={PROP_SCALE_LIMITS.step}
            unit="x"
            onChange={(v) => setSelectedPropScale(v)}
          />
          <p className="panel-hint size-hint">
            {(selectedProp.scale * 100).toFixed(0)}% of default size
          </p>
          <button
            type="button"
            className="btn secondary"
            onClick={() => togglePropVisibility()}
          >
            {selectedProp.visible ? 'Hide prop (H)' : 'Show prop (H)'}
          </button>
          {!selectedProp.visible && (
            <p className="panel-hint hidden-hint">
              Hidden props stay in your layout. Use Show or the list eye icon to
              bring this back.
            </p>
          )}
          <p className="panel-hint">
            Blue ring marks position — hover to highlight, drag to rotate.
            Backspace removes the prop. Props on the deck move with stage height.
          </p>
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={() => rotateSelected(-Math.PI / 4)}
            >
              Rotate -45 deg
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => rotateSelected(Math.PI / 4)}
            >
              Rotate +45 deg
            </button>
          </div>
          <button
            type="button"
            className="btn danger"
            onClick={() => deleteSelectedProp()}
          >
            Delete prop (Backspace)
          </button>
        </section>
      )}

      <section className="panel panel-footer">
        <p className="stats">
          {props.length} props on stage
          {hiddenCount > 0 ? ` (${hiddenCount} hidden)` : ''}
        </p>
        <button
          type="button"
          className="btn secondary"
          onClick={clearAllProps}
          disabled={props.length === 0}
        >
          Clear all props
        </button>
      </section>

      <footer className="help">
        <p>
          <strong>Navigate:</strong> drag to orbit, scroll to zoom, right-drag to
          pan. WASD move, Q/E yaw, R/F pitch, Z/X zoom.
        </p>
        <p>
          <strong>Props:</strong> arrows move, PgUp/PgDn height, drag blue ring or
          gizmo to rotate, Backspace to remove, H hide, [ ] resize. R/F always
          adjust camera pitch.
        </p>
      </footer>
    </aside>
  );
}
