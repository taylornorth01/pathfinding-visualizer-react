//
import { GridNode, GridObject, Position } from '../model';

interface DijkstraNode extends GridNode {
	prev?: Position;
	dist: number;
}

export class Dijkstra {
	start: DijkstraNode;
	goal: DijkstraNode;
	grid: DijkstraNode[][];
	closed: DijkstraNode[];
	open: DijkstraNode[];
	current: DijkstraNode | undefined;

	constructor(grid: GridObject, start: Position, goal: Position) {
		this.grid = this.createGridMap(grid);
		this.start = { ...this.grid[start.y][start.x], dist: 0 };
		this.goal = { ...this.grid[goal.y][goal.x] };
		this.closed = [];
		this.open = [this.start];
	}

	createGridMap = (gr: GridObject): DijkstraNode[][] => {
		let mp: DijkstraNode[][] = [];
		let h = gr.length;
		let w = gr[0].length;
		for (let y = 0; y < h; y++) {
			let rw: DijkstraNode[] = [];
			for (let x = 0; x < w; x++) {
				let n: DijkstraNode = { ...gr[y][x], dist: Infinity };
				rw.push(n);
			}
			mp.push(rw);
		}
		return mp;
	};

	adjSquares = (): DijkstraNode[] => {
		let adjSq: DijkstraNode[] = [];
		let gr = this.grid;
		let sq = this.current;
		if (!sq) return adjSq;
		if (gr[sq.pos.y][sq.pos.x - 1]) adjSq.push(gr[sq.pos.y][sq.pos.x - 1]);
		if (gr[sq.pos.y][sq.pos.x + 1]) adjSq.push(gr[sq.pos.y][sq.pos.x + 1]);
		if (gr[sq.pos.y - 1]) adjSq.push(gr[sq.pos.y - 1][sq.pos.x]);
		if (gr[sq.pos.y + 1]) adjSq.push(gr[sq.pos.y + 1][sq.pos.x]);
		return adjSq;
	};

	makePath = (): DijkstraNode[] => {
		if (!this.current) return [];
		let shortPath: DijkstraNode[] = [];
		let prevSq: DijkstraNode = this.current;
		while (prevSq.prev) {
			let newSq = { ...this.grid[prevSq.prev.y][prevSq.prev.x] };
			newSq.state = 'path';
			shortPath.unshift(newSq);
			prevSq = newSq;
		}
		prevSq.state = 'path';
		shortPath.unshift(prevSq);
		return shortPath;
	};

	step = () => {
		this.open = this.open.sort((a, b) => {
			return a.dist - b.dist;
		});
		let localOpen: DijkstraNode[] = [];

		this.current = this.open.shift();
		if (!this.current) {
			return {
				modified: this.closed,
			};
		}

		this.current.state = 'closed';
		this.closed.push(this.current);

		if (this.current.type === 'goal') {
			return {
				path: this.makePath(),
			};
		}

		let adj = this.adjSquares();
		adj.forEach((sq) => {
			if (sq.type === 'start') return;
			if (sq.type === 'wall') return;
			if (!this.current) return;
			if (!this.closed.includes(sq) && !this.open.includes(sq)) {
				sq.dist = this.current.dist + 1;
				sq.prev = this.current.pos;
				sq.state = 'open';
				this.open.push(sq);
				localOpen.push(sq);
			}
		});

		return { modified: [this.current, ...localOpen] };
	};

	result = () => {
		while (this.open) {
			this.open = this.open.sort((a, b) => {
				return a.dist - b.dist;
			});

			this.current = this.open.shift();
			if (!this.current) {
				return {
					squares: this.closed,
				};
			}

			this.current.state = 'closed';
			this.closed.push(this.current);

			if (this.current.type === 'goal') {
				return {
					squares: [...this.closed, ...this.open, ...this.makePath()],
				};
			}

			let adj = this.adjSquares();
			adj.forEach((sq) => {
				if (sq.type === 'start') return;
				if (sq.type === 'wall') return;
				if (!this.current) return;
				if (!this.closed.includes(sq) && !this.open.includes(sq)) {
					sq.dist = this.current.dist + 1;
					sq.prev = this.current.pos;
					sq.state = 'open';
					this.open.push(sq);
				}
			});
		}

		return {
			squares: this.closed,
		};
	};
}
