//
import { Astar } from '../algorithm';
import { AlgorithmId, AlgorithmObject, GridObject, Position } from '../model';

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

export const getAlgorithmClass = (
	{ id }: AlgorithmId,
	grid: GridObject,
	start: Position,
	goal: Position
): Astar => {
	switch (id) {
		case 'astar':
			return new Astar(grid, start, goal);
		default:
			throw new Error('Algorithm not found');
	}
};
