//
import { Astar } from '../algorithm';
import { AlgorithmId, AlgorithmObject, AppState } from '../model';

export const getAlgorithmObject = (
	{ grid, start, goal }: AppState,
	{ id }: AlgorithmId
): AlgorithmObject => {
	switch (id) {
		case 'astar':
			return {
				id: 'astar',
				name: 'A*',
				get: () => new Astar(grid, start, goal),
			};
		case 'dijkstra':
			return { id: 'dijkstra', name: 'Dijkstra', get: () => null };
		case 'depthfs':
			return { id: 'depthfs', name: 'Depth First Search', get: () => null };
		default:
			throw new Error('Algorithm not found');
	}
};
