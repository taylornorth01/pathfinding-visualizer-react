//
export type FlagType = 'start' | 'goal';
export type BlockType = 'empty' | 'wall';
export type Visited = 'open' | 'closed' | 'current' | 'path';
export type NodeType = FlagType | BlockType;

export type NodeColour =
	| ' colour__wall'
	| ' colour__start'
	| ' colour__goal'
	| ' colour__closed'
	| ' colour__open'
	| ' colour__path'
	| ' colour__current'
	| '';

export interface Position {
	x: number;
	y: number;
}

export interface GridNode {
	pos: Position;
	state?: Visited;
	type: NodeType;
	overided?: BlockType;
}

export type GridObject = GridNode[][];
