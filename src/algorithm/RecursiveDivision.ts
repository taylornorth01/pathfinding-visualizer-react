//
import { GridObject } from '../model';

export class RecursiveDivision {
	grid: GridObject;
	minY: number;
	minX: number;
	maxY: number;
	maxX: number;

	constructor(grid: GridObject) {
		this.grid = grid;
		this.minY = 1;
		this.minX = 1;
		this.maxY = grid.length - 2;
		this.maxX = grid[0].length - 2;
	}

	boundingWalls = (sqs: GridObject): GridObject => {
		let h = sqs.length;
		let w = sqs[0].length;
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				if (sqs[y][x].type === 'start' || sqs[y][x].type === 'goal') continue;
				if (sqs[y][x].pos.y === 0) sqs[y][x].type = 'wall';
				if (sqs[y][x].pos.x === 0) sqs[y][x].type = 'wall';
				if (sqs[y][x].pos.y === h - 1) sqs[y][x].type = 'wall';
				if (sqs[y][x].pos.x === w - 1) sqs[y][x].type = 'wall';
			}
		}
		return sqs;
	};

	addInnerWalls = (
		orientation: boolean,
		minX: number,
		maxX: number,
		minY: number,
		maxY: number
	) => {
		if (orientation) {
			if (maxX - minX < 2) return;

			let y = Math.floor(this.randomNumber(minY, maxY) / 2) * 2;
			this.addHorWall(minX, maxX, y);

			this.addInnerWalls(!orientation, minX, maxX, minY, y - 1);
			this.addInnerWalls(!orientation, minX, maxX, y + 1, maxY);
		} else {
			if (maxY - minY < 2) return;

			let x = Math.floor(this.randomNumber(minX, maxX) / 2) * 2;
			this.addVerWall(minY, maxY, x);

			this.addInnerWalls(!orientation, minX, x - 1, minY, maxY);
			this.addInnerWalls(!orientation, x + 1, maxX, minY, maxY);
		}
	};

	addHorWall = (minX: number, maxX: number, y: number) => {
		var gate = Math.floor(this.randomNumber(minX, maxX) / 2) * 2 + 1;

		for (let x = minX; x <= maxX; x++) {
			if (this.grid[y][x].type === 'start') continue;
			if (this.grid[y][x].type === 'goal') continue;
			if (x === gate) this.grid[y][x].type = 'empty';
			else this.grid[y][x].type = 'wall';
		}
	};

	addVerWall(minY: number, maxY: number, x: number) {
		var gate = Math.floor(this.randomNumber(minY, maxY) / 2) * 2 + 1;

		for (let y = minY; y <= maxY; y++) {
			if (this.grid[y][x].type === 'start') continue;
			if (this.grid[y][x].type === 'goal') continue;
			if (y === gate) this.grid[y][x].type = 'empty';
			else this.grid[y][x].type = 'wall';
		}
	}

	randomNumber = (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	result = () => {
		this.addInnerWalls(true, this.minX, this.maxX, this.minY, this.maxY);
		return this.boundingWalls(this.grid);
	};
}
