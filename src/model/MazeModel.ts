//
import { RandomMaze, RecursiveDivision } from '../algorithm';

export type MazeObject =
	| {
			id: 'recursive';
			name: 'Recrusive Division';
			get: () => RecursiveDivision;
	  }
	| {
			id: 'random';
			name: 'Random';
			get: () => RandomMaze;
	  };

export type MazeId = Pick<MazeObject, 'id'>;
