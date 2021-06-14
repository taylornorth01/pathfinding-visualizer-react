//
export type Visited = 'open' | 'closed' | 'current';
export type NodeType = 'start' | 'goal' | 'empty' | 'wall';

export interface Position {
	x: number;
	y: number;
}

export interface GridNode {
	pos: Position;
	state?: Visited;
	type: NodeType;
}

export type Grid = GridNode[][];
