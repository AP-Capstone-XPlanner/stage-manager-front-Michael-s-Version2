import type { PropInteractionState, PropType } from '../../../types';
import {
  AnimatedNightstand,
  AnimatedWardrobe,
  BedModel,
  BookshelfModel,
  CoffeeTableModel,
  DiningSetModel,
  SofaModel,
} from './LivingRoomModels';
import {
  ConductorPodiumModel,
  MusicStandModel,
  MusicalInstrumentsModel,
  MusicianChairModel,
} from './OrchestraModels';

export interface PropCatalogModelProps {
  type: PropType;
  interactionState?: PropInteractionState;
  onToggleDiningChair?: (index: number) => void;
}

export function PropCatalogModel({
  type,
  interactionState,
  onToggleDiningChair,
}: PropCatalogModelProps) {
  switch (type) {
    case 'sofa':
      return <SofaModel />;
    case 'coffee_table':
      return <CoffeeTableModel />;
    case 'dining_set':
      return (
        <DiningSetModel
          chairsPulled={interactionState?.chairsPulled}
          onToggleChair={onToggleDiningChair}
        />
      );
    case 'bed':
      return <BedModel />;
    case 'wardrobe':
      return <AnimatedWardrobe isOpen={interactionState?.open ?? false} />;
    case 'bookshelf':
      return <BookshelfModel />;
    case 'nightstand':
      return <AnimatedNightstand isDrawerOpen={interactionState?.open ?? false} />;
    case 'musician_chair':
      return <MusicianChairModel />;
    case 'conductor_podium':
      return <ConductorPodiumModel />;
    case 'music_stand':
      return <MusicStandModel />;
    case 'musical_instruments':
      return <MusicalInstrumentsModel />;
    default:
      return null;
  }
}
