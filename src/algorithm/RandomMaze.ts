//
import { GridObject } from '../model';

export class RandomMaze {
	grid: GridObject;

	constructor(grid: GridObject) {
		this.grid = grid;
	}

	result = () => {
		return this.grid.map((row) => {
			return row.map((node) => {
				if (node.type === 'start' || node.type === 'goal') return node;
				if (Math.random() > 0.7) {
					node.type = 'wall';
					return node;
				}
				return node;
			});
		});
	};
}
