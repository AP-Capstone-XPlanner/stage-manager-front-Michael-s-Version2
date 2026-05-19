import { PROP_CATALOG } from '../../constants/props';
import { useStageStore } from '../../store/stageStore';

export function PropList() {
  const props = useStageStore((s) => s.props);
  const selectedPropId = useStageStore((s) => s.selectedPropId);
  const selectProp = useStageStore((s) => s.selectProp);
  const togglePropVisibility = useStageStore((s) => s.togglePropVisibility);

  if (props.length === 0) return null;

  return (
    <section className="panel">
      <h2>On stage</h2>
      <p className="panel-hint">Click to select. Use the eye to hide or show.</p>
      <ul className="prop-list">
        {props.map((prop) => {
          const label = PROP_CATALOG.find((p) => p.type === prop.type)?.label ?? prop.type;
          const isSelected = prop.id === selectedPropId;
          return (
            <li key={prop.id} className={`prop-list-item ${isSelected ? 'selected' : ''}`}>
              <span
                className="prop-list-swatch"
                style={{ background: prop.color }}
                aria-hidden
              />
              <button
                type="button"
                className="prop-list-select"
                onClick={() => selectProp(prop.id)}
              >
                <span className="prop-list-name">
                  {prop.tag.trim() || label}
                </span>
                <span className="prop-list-meta">
                  {prop.tag.trim() ? label : ''}
                  {prop.tag.trim() ? ' · ' : ''}
                  {prop.visible ? 'Visible' : 'Hidden'} · {(prop.scale * 100).toFixed(0)}%
                </span>
              </button>
              <button
                type="button"
                className="prop-list-visibility"
                title={prop.visible ? 'Hide prop' : 'Show prop'}
                aria-label={prop.visible ? 'Hide prop' : 'Show prop'}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePropVisibility(prop.id);
                }}
              >
                {prop.visible ? '👁' : '👁‍🗨'}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
