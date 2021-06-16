//
import { GridNode, GridObject, Position } from '../model';

interface DfsNode extends GridNode {
	prev?: Position;
}

export class DepthFS {
	grid: DfsNode[][];
	start: DfsNode;
	goal: DfsNode;
	closed: DfsNode[];
	open: DfsNode[];
	current: DfsNode | undefined;

	constructor(grid: GridObject, start: Position, goal: Position) {
		this.grid = this.createGridMap(grid);
		this.start = grid[start.y][start.x];
		this.goal = grid[goal.y][goal.x];
		this.closed = [];
		this.open = [this.start];
	}

	step = () => {
		this.current = this.open.shift();
		if (!this.current) {
			return {
				path: [],
			};
		}

		this.current.state = 'closed';
		if (!this.closed.includes(this.current)) {
			this.closed.push(this.current);
		}

		if (this.current.type === 'goal') {
			return {
				path: this.makePath(),
			};
		}

		let adj = this.adjSquares();
		let l = adj.length;
		for (let i = 0; i < l; i++) {
			const sq = adj[i];
			if (sq.type === 'start') continue;
			if (sq.type === 'wall') continue;
			if (!this.current) continue;
			if (!this.closed.includes(sq) && !this.open.includes(sq)) {
				sq.prev = this.current.pos;
				sq.state = 'current';
				this.open.push(sq);
				return { modified: [this.current, ...this.open] };
			}
		}

		if (!this.current || !this.current.prev) {
			return {
				modified: this.closed,
			};
		}

		let prev = this.grid[this.current.prev.y][this.current.prev.x];
		prev.state = 'current';
		this.open.push(prev);
		this.current.state = 'closed';

		return {
			modified: [this.current, ...this.closed],
		};
	};

	result = (): { squares: DfsNode[] } => {
		while (this.closed) {
			let shouldContinue = false;
			this.current = this.open.shift();
			if (!this.current) {
				return {
					squares: [],
				};
			}

			this.current.state = 'closed';
			if (!this.closed.includes(this.current)) {
				this.closed.push(this.current);
			}

			if (this.current.type === 'goal') {
				return {
					squares: [...this.closed, ...this.makePath()],
				};
			}

			let adj = this.adjSquares();
			adj.every((sq) => {
				if (sq.type === 'start') return true;
				if (sq.type === 'wall') return true;
				if (!this.current) return true;
				if (!this.closed.includes(sq) && !this.open.includes(sq)) {
					sq.prev = this.current.pos;
					sq.state = 'current';
					this.open.push(sq);
					shouldContinue = true;
					return false;
				}
				return true;
			});

			if (shouldContinue) continue;

			if (!this.current || !this.current.prev) {
				return {
					squares: this.closed,
				};
			}

			let prev = this.grid[this.current.prev.y][this.current.prev.x];
			prev.state = 'current';
			this.open.push(prev);
			this.current.state = 'closed';
		}

		return {
			squares: [...this.closed],
		};
	};

	noRemainingSquares = () => {
		return this.closed.filter((sq) => {
			return sq.state !== 'closed' ? sq : undefined;
		});
	};

	adjSquares = (): DfsNode[] => {
		let adjSq: DfsNode[] = [];
		let gr = this.grid;
		let sq = this.current;
		if (!sq) return adjSq;
		if (gr[sq.pos.y][sq.pos.x - 1]) adjSq.push(gr[sq.pos.y][sq.pos.x - 1]);
		if (gr[sq.pos.y + 1]) adjSq.push(gr[sq.pos.y + 1][sq.pos.x]);
		if (gr[sq.pos.y][sq.pos.x + 1]) adjSq.push(gr[sq.pos.y][sq.pos.x + 1]);
		if (gr[sq.pos.y - 1]) adjSq.push(gr[sq.pos.y - 1][sq.pos.x]);

		return adjSq;
	};

	makePath = (): DfsNode[] => {
		if (!this.current) return [];
		let shortPath: DfsNode[] = [];
		let prevSq: DfsNode = this.current;
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

	createGridMap = (gr: GridObject): DfsNode[][] => {
		let mp: DfsNode[][] = [];
		let h = gr.length;
		let w = gr[0].length;
		for (let y = 0; y < h; y++) {
			let rw: DfsNode[] = [];
			for (let x = 0; x < w; x++) {
				let n: DfsNode = { ...gr[y][x], prev: undefined };
				rw.push(n);
			}
			mp.push(rw);
		}
		return mp;
	};
}
