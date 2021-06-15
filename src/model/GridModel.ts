//
export type FlagType = 'start' | 'goal';
export type BlockType = 'empty' | 'wall';
export type Visited = 'open' | 'closed' | 'current';
export type NodeType = FlagType | BlockType;

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
