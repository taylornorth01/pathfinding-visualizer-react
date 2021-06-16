//
import { RandomMaze, RecursiveDivision } from '../algorithm';
import { GridObject, MazeId, MazeObject } from '../model';

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
