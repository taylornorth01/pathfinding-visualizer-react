//
import { GridNode, GridObject, Position } from '../model';

interface AstarNode extends GridNode {
	gScore: number;
	fScore: number;
	prev?: Position;
}

export class Astar {
	start: AstarNode;
	goal: AstarNode;
	grid: AstarNode[][];
	current: AstarNode | undefined;
	closed: AstarNode[];
	flags: { st: Position; go: Position };
	open: AstarNode[];

	constructor(grid: GridObject, start: Position, goal: Position) {
		this.closed = [];
		this.open = [];
		this.flags = { st: start, go: goal };
		this.grid = this.createGridMap(grid);
		this.start = {
			...grid[start.y][start.x],
			gScore: 0,
			fScore: Infinity,
		};
		this.goal = {
			...grid[goal.y][goal.x],
			gScore: Infinity,
			fScore: Infinity,
		};
		this.start.fScore = this.heur(this.start, this.goal);
		this.open = [this.start];
	}

	result = (): { squares: AstarNode[] } => {
		while (this.open) {
			this.open = this.open.sort((a, b) => {
				return b.gScore - a.gScore;
			});
			this.open = this.open.sort((a, b) => {
				return a.fScore - b.fScore;
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
				let newG = this.current.gScore + this.heur(sq, this.current);
				if (newG < sq.gScore) {
					sq.prev = this.current.pos;
					sq.gScore = newG;
					sq.fScore = sq.gScore + this.heur(sq, this.goal);
					if (!this.open.includes(sq)) {
						sq.state = 'open';
						this.open.push(sq);
					}
				}
			});
		}

		return {
			squares: this.closed,
		};
	};

	step = (): {
		path?: AstarNode[];
		modified?: AstarNode[];
	} => {
		this.open = this.open.sort((a, b) => {
			return b.gScore - a.gScore;
		});
		this.open = this.open.sort((a, b) => {
			return a.fScore - b.fScore;
		});

		this.current = this.open.shift();
		if (!this.current) {
			return {
				path: [],
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
			let newG = this.current.gScore + this.heur(sq, this.current);
			if (newG < sq.gScore) {
				sq.prev = this.current.pos;
				sq.gScore = newG;
				sq.fScore = sq.gScore + this.heur(sq, this.goal);
				if (!this.open.includes(sq)) {
					sq.state = 'open';
					this.open.push(sq);
				}
			}
		});

		return { modified: [this.current, ...this.open] };
	};

	adjSquares = (): AstarNode[] => {
		let adjSq: AstarNode[] = [];
		let gr = this.grid;
		let sq = this.current;
		if (!sq) return adjSq;
		if (gr[sq.pos.y][sq.pos.x - 1]) adjSq.push(gr[sq.pos.y][sq.pos.x - 1]);
		if (gr[sq.pos.y][sq.pos.x + 1]) adjSq.push(gr[sq.pos.y][sq.pos.x + 1]);
		if (gr[sq.pos.y - 1]) adjSq.push(gr[sq.pos.y - 1][sq.pos.x]);
		if (gr[sq.pos.y + 1]) adjSq.push(gr[sq.pos.y + 1][sq.pos.x]);
		return adjSq;
	};

	heur = (from: AstarNode, to: AstarNode): number => {
		let ny = Math.abs(from.pos.y - to.pos.y);
		let nx = Math.abs(from.pos.x - to.pos.x);
		return nx + ny;
	};

	makePath = (): AstarNode[] => {
		if (!this.current) return [];
		let shortPath: AstarNode[] = [];
		let prevSq: AstarNode = this.current;
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

	createGridMap = (gr: GridObject): AstarNode[][] => {
		let mp: AstarNode[][] = [];
		let h = gr.length;
		let w = gr[0].length;
		for (let y = 0; y < h; y++) {
			let rw: AstarNode[] = [];
			for (let x = 0; x < w; x++) {
				let n: AstarNode = {
					...gr[y][x],
					gScore: Infinity,
					fScore: Infinity,
				};
				rw.push(n);
			}
			mp.push(rw);
		}
		return mp;
	};
}
