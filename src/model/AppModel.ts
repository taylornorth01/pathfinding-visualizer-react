//
import { GridNode, GridObject, NodeType, Position } from './GridModel';

export interface AppState {
	grid: GridObject;
	start: Position;
	goal: Position;
	isDragging: boolean;
	placeType?: NodeType;
}

export type AppActions =
	| { type: 'toggle-dragging'; payload?: NodeType }
	| { type: 'place-node'; payload: GridNode };
