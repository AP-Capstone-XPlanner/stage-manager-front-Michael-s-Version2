import { PROP_CATALOG_CATEGORIES, STAGE_LIMITS } from '../../constants/props';
import { STAGE_ENCLOSURE_HEIGHT_LIMITS } from '../../constants/stage';
import { useStageStore } from '../../store/stageStore';
import type { PropType } from '../../types';
import { DimensionControl } from './DimensionControl';
import { PropList } from './PropList';
import { GroundColorPicker } from './GroundColorPicker';
import { SkyColorPicker } from './SkyColorPicker';
import { StageTexturePicker } from './StageTexturePicker';
import { StageEnclosurePicker } from './StageEnclosurePicker';

export function Sidebar() {
  const stage = useStageStore((s) => s.stage);
  const skyColor = useStageStore((s) => s.skyColor);
  const groundColor = useStageStore((s) => s.groundColor);
  const stageTexture = useStageStore((s) => s.stageTexture);
  const setStageDimension = useStageStore((s) => s.setStageDimension);
  const setSkyColor = useStageStore((s) => s.setSkyColor);
  const setGroundColor = useStageStore((s) => s.setGroundColor);
  const setStageTexture = useStageStore((s) => s.setStageTexture);
  const showStageBaseline = useStageStore((s) => s.showStageBaseline);
  const showStageAreaGrid = useStageStore((s) => s.showStageAreaGrid);
  const showStageZones = useStageStore((s) => s.showStageZones);
  const showStageEnclosure = useStageStore((s) => s.showStageEnclosure);
  const stageEnclosureHeight = useStageStore((s) => s.stageEnclosureHeight);
  const setShowStageBaseline = useStageStore((s) => s.setShowStageBaseline);
  const setShowStageAreaGrid = useStageStore((s) => s.setShowStageAreaGrid);
  const setShowStageZones = useStageStore((s) => s.setShowStageZones);
  const setShowStageEnclosure = useStageStore((s) => s.setShowStageEnclosure);
  const setStageEnclosureHeight = useStageStore((s) => s.setStageEnclosureHeight);
  const props = useStageStore((s) => s.props);
  const placementType = useStageStore((s) => s.placementType);
  const mode = useStageStore((s) => s.mode);
  const snapToGrid = useStageStore((s) => s.snapToGrid);
  const startPlacement = useStageStore((s) => s.startPlacement);
  const cancelPlacement = useStageStore((s) => s.cancelPlacement);
  const toggleSnap = useStageStore((s) => s.toggleSnap);
  const hiddenCount = props.filter((p) => !p.visible).length;

  const handlePropCardClick = (type: PropType) => {
    if (placementType === type && mode === 'place') {
      cancelPlacement();
      return;
    }
    startPlacement(type);
  };

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h1>XPlanner</h1>
      </header>

      <section className="panel">
        <h2>Stage</h2>
        <StageTexturePicker value={stageTexture} onChange={setStageTexture} />
        <DimensionControl
          label="Length"
          value={stage.length}
          min={STAGE_LIMITS.length.min}
          max={STAGE_LIMITS.length.max}
          step={1}
          inputStep={0.1}
          unit="m"
          onChange={(v) => setStageDimension('length', v)}
        />
        <DimensionControl
          label="Width"
          value={stage.width}
          min={STAGE_LIMITS.width.min}
          max={STAGE_LIMITS.width.max}
          step={1}
          inputStep={0.1}
          unit="m"
          onChange={(v) => setStageDimension('width', v)}
        />
        <DimensionControl
          label="Height"
          value={stage.height}
          min={STAGE_LIMITS.height.min}
          max={STAGE_LIMITS.height.max}
          step={0.1}
          inputStep={0.1}
          unit="m"
          onChange={(v) => setStageDimension('height', v)}
        />
        <label className="toggle stage-toggle">
          <input
            type="checkbox"
            checked={showStageBaseline}
            onChange={(e) => setShowStageBaseline(e.target.checked)}
          />
          Center cross
        </label>
        <label className="toggle stage-toggle">
          <input
            type="checkbox"
            checked={showStageAreaGrid}
            onChange={(e) => setShowStageAreaGrid(e.target.checked)}
          />
          Area grid
        </label>
        <label className="toggle stage-toggle">
          <input
            type="checkbox"
            checked={showStageZones}
            onChange={(e) => setShowStageZones(e.target.checked)}
          />
          Stage zones
        </label>
        <label className="toggle stage-toggle">
          <input
            type="checkbox"
            checked={showStageEnclosure}
            onChange={(e) => setShowStageEnclosure(e.target.checked)}
          />
          Stage walls
        </label>
        {showStageEnclosure && (
          <>
            <DimensionControl
              label="Wall height"
              value={stageEnclosureHeight}
              min={STAGE_ENCLOSURE_HEIGHT_LIMITS.min}
              max={STAGE_ENCLOSURE_HEIGHT_LIMITS.max}
              step={0.5}
              inputStep={0.1}
              unit="m"
              onChange={setStageEnclosureHeight}
            />
            <StageEnclosurePicker />
          </>
        )}
      </section>

      <PropList />

      <section className="panel">
        <div className="panel-title-row">
          <h2>Props</h2>
          <label className="toggle">
            <input type="checkbox" checked={snapToGrid} onChange={toggleSnap} />
            Snap
          </label>
        </div>
        {mode === 'place' && (
          <p className="placement-banner">Click stage to place · Esc cancel</p>
        )}
        {PROP_CATALOG_CATEGORIES.map((category) => (
          <div key={category.id} className="prop-category">
            <h3 className="prop-category-title">{category.label}</h3>
            <div className="prop-grid">
              {category.items.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  className={`prop-card ${
                    placementType === item.type ? 'active' : ''
                  }`}
                  onClick={() => handlePropCardClick(item.type)}
                  title={item.label}
                >
                  <span className="prop-icon">{item.icon}</span>
                  <span className="prop-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        {mode === 'place' && (
          <button type="button" className="btn secondary" onClick={cancelPlacement}>
            Cancel
          </button>
        )}
      </section>

      <section className="panel">
        <h2>Environment</h2>
        <SkyColorPicker color={skyColor} onChange={setSkyColor} />
        <GroundColorPicker color={groundColor} onChange={setGroundColor} />
      </section>

      <section className="panel panel-footer">
        <p className="stats">
          {props.length} props
          {hiddenCount > 0 ? ` · ${hiddenCount} hidden` : ''}
        </p>
      </section>
    </aside>
  );
}
