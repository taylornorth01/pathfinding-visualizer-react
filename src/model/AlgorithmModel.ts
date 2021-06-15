//

export type AlgorithmObject =
	| { id: 'astar'; name: 'A*' }
	| { id: 'dijkstra'; name: 'Dijkstra' }
	| { id: 'depthfs'; name: 'Depth First Search' };

export type AlgorithmId = Pick<AlgorithmObject, 'id'>;
