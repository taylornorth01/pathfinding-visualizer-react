//
import { Astar } from '../algorithm';

export type AlgorithmObject =
	| { id: 'astar'; name: 'A*'; get: () => Astar }
	| { id: 'dijkstra'; name: 'Dijkstra'; get: () => null }
	| { id: 'depthfs'; name: 'Depth First Search'; get: () => null };

export type AlgorithmId = Pick<AlgorithmObject, 'id'>;
