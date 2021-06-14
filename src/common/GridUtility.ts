//
import { GridObject, GridNode } from '../model';

export const createGrid = (h: number, w: number): GridObject => {
	let grid: GridNode[][] = [];

	for (let y = 0; y < h; y++) {
		let row: GridNode[] = [];
		for (let x = 0; x < w; x++) {
			row.push({ pos: { x, y }, type: 'empty' });
		}
		grid.push(row);
	}

	return grid;
};
