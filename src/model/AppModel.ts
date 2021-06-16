//
import { AlgorithmId, AlgorithmObject } from './AlgorithmModel';
import { GridNode, GridObject, NodeType, Position } from './GridModel';
import { MazeId, MazeObject } from './MazeModel';

export type Speed =
	| { id: 'slow'; rate: 100 }
	| { id: 'medium'; rate: 50 }
	| { id: 'fast'; rate: 1 };

export type SpeedId = Pick<Speed, 'id'>;

export interface AppState {
	grid: GridObject;
	start: Position;
	goal: Position;
	isDragging: boolean;
	isSearching: boolean;
	wasSearch: boolean;
	placeType?: NodeType;
	algorithm?: AlgorithmObject;
	maze?: MazeObject;
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
	| { type: 'change-speed'; payload: SpeedId }
	| { type: 'set-was-search'; payload: boolean }
	| { type: 'change-maze'; payload: MazeId }
	| { type: 'clear-walls' };
