//
import { Astar, Dijkstra } from '../algorithm';
import { AlgorithmId, AlgorithmObject, AppState } from '../model';
import { clearPath, mapNodesStateToGrid } from './GridUtility';

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
			return {
				id: 'dijkstra',
				name: 'Dijkstra',
				get: () => new Dijkstra(grid, start, goal),
			};
		// case 'depthfs':
		// 	return { id: 'depthfs', name: 'Depth First Search', get: () => null };
		default:
			throw new Error('Algorithm not found');
	}
};

export const updateAlgorithm = (state: AppState): AppState => {
	let algorithm,
		grid = state.grid;
	if (state.algorithm) {
		algorithm = getAlgorithmObject(state, state.algorithm);
		if (state.wasSearch) {
			grid = clearPath(grid);
			grid = mapNodesStateToGrid(algorithm.get().result().squares, grid);
		}
	}
	return { ...state, algorithm, grid };
};
