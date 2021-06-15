//
import { AlgorithmId, AlgorithmObject } from '../model';

export const getAlgorithmObject = ({ id }: AlgorithmId): AlgorithmObject => {
	switch (id) {
		case 'astar':
			return { id: 'astar', name: 'A*' };
		case 'dijkstra':
			return { id: 'dijkstra', name: 'Dijkstra' };
		case 'depthfs':
			return { id: 'depthfs', name: 'Depth First Search' };
		default:
			throw new Error('Algorithm not found');
	}
};
