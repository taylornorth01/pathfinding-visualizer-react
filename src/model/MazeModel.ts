//

import { RecursiveDivision } from '../algorithm';

export type MazeObject = {
	id: 'recursive';
	name: 'Recrusive Division Maze';
	get: () => RecursiveDivision;
};

export type MazeId = Pick<MazeObject, 'id'>;
