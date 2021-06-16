//
import { AlgorithmId, AlgorithmObject } from './AlgorithmModel';
import { GridNode, GridObject, NodeType, Position } from './GridModel';

export type Speed =
	| { id: 'slow'; rate: 100 }
	| { id: 'medium'; rate: 50 }
	| { id: 'fast'; rate: 10 };

export type SpeedId = Pick<Speed, 'id'>;

export interface AppState {
	grid: GridObject;
	start: Position;
	goal: Position;
	isDragging: boolean;
	isSearching: boolean;
	placeType?: NodeType;
	algorithm?: AlgorithmObject;
	speed: Speed;
}

export type AppActions =
	| { type: 'toggle-dragging'; payload?: NodeType }
	| { type: 'modify-nodes'; payload: GridNode }
	| { type: 'change-algorithm'; payload: AlgorithmId }
	| { type: 'update-grid'; payload: GridNode[] }
	| { type: 'draw-path'; payload: GridNode }
	| { type: 'toggle-searching' }
	| { type: 'clear-path' }
	| { type: 'change-speed'; payload: SpeedId };
