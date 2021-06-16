//
import { Astar, Dijkstra } from '../algorithm';

export type AlgorithmObject =
	| { id: 'astar'; name: 'A*'; get: () => Astar }
	| { id: 'dijkstra'; name: 'Dijkstra'; get: () => Dijkstra };
// | { id: 'depthfs'; name: 'Depth First Search'; get: () => Astar };

export type AlgorithmId = Pick<AlgorithmObject, 'id'>;
