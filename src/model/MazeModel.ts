//
import { RandomMaze, RecursiveDivision } from '../algorithm';

export type MazeObject =
	| {
			id: 'recursive';
			name: 'Recrusive Division Maze';
			get: () => RecursiveDivision;
	  }
	| {
			id: 'random';
			name: 'Random Maze';
			get: () => RandomMaze;
	  };

export type MazeId = Pick<MazeObject, 'id'>;
