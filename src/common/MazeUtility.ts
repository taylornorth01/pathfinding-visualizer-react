//
import { RandomMaze, RecursiveDivision } from '../algorithm';
import { GridObject, MazeId, MazeObject, AppState } from '../model';
import { updateAlgorithm } from './AlgorithmUtility';
import { clearWalls } from './GridUtility';

export const getMazeObject = ({ id }: MazeId, grid: GridObject): MazeObject => {
	switch (id) {
		case 'recursive':
			return {
				id: 'recursive',
				name: 'Recrusive Division Maze',
				get: () => new RecursiveDivision(grid),
			};
		case 'random':
			return {
				id: 'random',
				name: 'Random Maze',
				get: () => new RandomMaze(grid),
			};
		default:
			throw new Error('Maze not found');
	}
};

export const updateMaze = (state: AppState): AppState | undefined => {
	if (!state.maze) return;
	let { grid, maze } = state;
	grid = clearWalls(grid);
	grid = maze.get().result();
	state = { ...state, maze, grid };
	return { ...state, ...updateAlgorithm(state) };
};
