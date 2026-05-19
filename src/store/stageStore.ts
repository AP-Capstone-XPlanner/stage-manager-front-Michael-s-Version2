import { create } from 'zustand';
import type { EditorMode, PlacedProp, PropType, StageDimensions } from '../types';
import { getDefaultPropColor } from '../constants/propColors';
import { normalizeHexColor } from '../utils/color';
import { createNewProp, clampPropScale } from '../utils/propDefaults';
import { PROP_TAG_MAX_LENGTH } from '../constants/props';
import { clampStageDimension } from '../utils/stageDimensions';
import { shiftGroundedPropsForStageHeight } from '../utils/propBounds';
import { normalizePropPosition, normalizeRotation } from '../utils/propPosition';
import type { NewPlacedProp } from '../utils/propDefaults';

interface StageState {
  stage: StageDimensions;
  props: PlacedProp[];
  selectedPropId: string | null;
  placementType: PropType | null;
  mode: EditorMode;
  snapToGrid: boolean;

  setStageDimension: (key: keyof StageDimensions, value: number) => void;
  setStage: (stage: Partial<StageDimensions>) => void;
  startPlacement: (type: PropType) => void;
  cancelPlacement: () => void;
  setMode: (mode: EditorMode) => void;
  addProp: (prop: NewPlacedProp) => void;
  updateProp: (id: string, patch: Partial<PlacedProp>) => void;
  removeProp: (id: string) => void;
  selectProp: (id: string | null) => void;
  rotateSelected: (deltaRadians: number) => void;
  setSelectedPropRotation: (rotation: number) => void;
  moveSelectedProp: (dx: number, dz: number) => void;
  moveSelectedPropVertical: (dy: number) => void;
  setSelectedPropPosition: (x: number, z: number, y?: number) => void;
  deleteSelectedProp: () => void;
  setSelectedPropScale: (scale: number) => void;
  togglePropVisibility: (id?: string) => void;
  setSelectedPropTag: (tag: string) => void;
  setSelectedPropColor: (color: string) => void;
  toggleSnap: () => void;
  clearAllProps: () => void;
}

const defaultStage: StageDimensions = {
  length: 12,
  width: 8,
  height: 0.6,
};

export const useStageStore = create<StageState>((set, get) => ({
  stage: defaultStage,
  props: [],
  selectedPropId: null,
  placementType: null,
  mode: 'select',
  snapToGrid: true,

  setStageDimension: (key, value) =>
    set((s) => {
      const clamped = clampStageDimension(key, value);
      if (key !== 'height') {
        return { stage: { ...s.stage, [key]: clamped } };
      }
      const oldTop = s.stage.height;
      const newTop = clamped;
      const stage = { ...s.stage, height: newTop };
      return {
        stage,
        props: shiftGroundedPropsForStageHeight(s.props, oldTop, newTop),
      };
    }),

  setStage: (stage) => set((s) => ({ stage: { ...s.stage, ...stage } })),

  startPlacement: (type) =>
    set({ placementType: type, mode: 'place', selectedPropId: null }),

  cancelPlacement: () => set({ placementType: null, mode: 'select' }),

  setMode: (mode) =>
    set((s) => ({
      mode,
      placementType: mode === 'select' ? null : s.placementType,
    })),

  addProp: (prop) =>
    set((s) => {
      const id = crypto.randomUUID();
      return {
        props: [...s.props, { ...createNewProp(prop), id }],
        mode: 'select',
        placementType: null,
        selectedPropId: id,
      };
    }),

  updateProp: (id, patch) =>
    set((s) => ({
      props: s.props.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),

  removeProp: (id) =>
    set((s) => ({
      props: s.props.filter((p) => p.id !== id),
      selectedPropId: s.selectedPropId === id ? null : s.selectedPropId,
    })),

  selectProp: (id) => set({ selectedPropId: id, mode: 'select', placementType: null }),

  rotateSelected: (deltaRadians) => {
    const { selectedPropId, props, updateProp } = get();
    if (!selectedPropId) return;
    const prop = props.find((p) => p.id === selectedPropId);
    if (!prop) return;
    updateProp(selectedPropId, {
      rotation: normalizeRotation(prop.rotation + deltaRadians),
    });
  },

  setSelectedPropRotation: (rotation) => {
    const { selectedPropId, updateProp } = get();
    if (!selectedPropId) return;
    updateProp(selectedPropId, { rotation: normalizeRotation(rotation) });
  },

  moveSelectedProp: (dx, dz) => {
    const { selectedPropId, props, stage, snapToGrid, updateProp } = get();
    if (!selectedPropId) return;
    const prop = props.find((p) => p.id === selectedPropId);
    if (!prop) return;
    const position = normalizePropPosition(
      prop.position[0] + dx,
      prop.position[1],
      prop.position[2] + dz,
      stage.length / 2,
      stage.width / 2,
      snapToGrid,
      stage.height,
      prop,
    );
    updateProp(selectedPropId, { position });
  },

  moveSelectedPropVertical: (dy) => {
    const { selectedPropId, props, stage, snapToGrid, updateProp } = get();
    if (!selectedPropId) return;
    const prop = props.find((p) => p.id === selectedPropId);
    if (!prop) return;
    const position = normalizePropPosition(
      prop.position[0],
      prop.position[1] + dy,
      prop.position[2],
      stage.length / 2,
      stage.width / 2,
      snapToGrid,
      stage.height,
      prop,
    );
    updateProp(selectedPropId, { position });
  },

  setSelectedPropPosition: (x, z, y) => {
    const { selectedPropId, props, stage, snapToGrid, updateProp } = get();
    if (!selectedPropId) return;
    const prop = props.find((p) => p.id === selectedPropId);
    if (!prop) return;
    const position = normalizePropPosition(
      x,
      y ?? prop.position[1],
      z,
      stage.length / 2,
      stage.width / 2,
      snapToGrid,
      stage.height,
      prop,
    );
    updateProp(selectedPropId, { position });
  },

  deleteSelectedProp: () => {
    const { selectedPropId, removeProp } = get();
    if (selectedPropId) removeProp(selectedPropId);
  },

  setSelectedPropScale: (scale) => {
    const { selectedPropId, props, stage, snapToGrid, updateProp } = get();
    if (!selectedPropId) return;
    const prop = props.find((p) => p.id === selectedPropId);
    if (!prop) return;
    const nextScale = clampPropScale(scale);
    const position = normalizePropPosition(
      prop.position[0],
      prop.position[1],
      prop.position[2],
      stage.length / 2,
      stage.width / 2,
      snapToGrid,
      stage.height,
      { ...prop, scale: nextScale },
    );
    updateProp(selectedPropId, { scale: nextScale, position });
  },

  togglePropVisibility: (id) => {
    const propId = id ?? get().selectedPropId;
    if (!propId) return;
    const prop = get().props.find((p) => p.id === propId);
    if (!prop) return;
    get().updateProp(propId, { visible: !prop.visible });
  },

  setSelectedPropTag: (tag) => {
    const { selectedPropId, updateProp } = get();
    if (!selectedPropId) return;
    updateProp(selectedPropId, {
      tag: tag.slice(0, PROP_TAG_MAX_LENGTH),
    });
  },

  setSelectedPropColor: (color) => {
    const { selectedPropId, props, updateProp } = get();
    if (!selectedPropId) return;
    const prop = props.find((p) => p.id === selectedPropId);
    if (!prop) return;
    updateProp(selectedPropId, {
      color: normalizeHexColor(color, getDefaultPropColor(prop.type)),
    });
  },

  toggleSnap: () => set((s) => ({ snapToGrid: !s.snapToGrid })),

  clearAllProps: () => set({ props: [], selectedPropId: null }),
}));
