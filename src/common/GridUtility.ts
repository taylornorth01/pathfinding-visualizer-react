//
import { GridObject, GridNode, FlagType, Position } from '../model';
import { getViewportSize } from './AppUtility';

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

export const placeFlag = (
	flag: FlagType,
	pos: Position,
	grid: GridObject
): GridObject => {
	grid[pos.y][pos.x].type = flag;
	return grid;
};

export const clearPath = (grid: GridObject): GridObject => {
	return grid.map((row) => {
		return row.map((node) => {
			return { ...node, state: undefined };
		});
	});
};

export const mapNodesStateToGrid = (
	nodes: GridNode[],
	grid: GridObject
): GridObject => {
	nodes.map((node) => (grid[node.pos.y][node.pos.x].state = node.state));
	return grid;
};

export const clearWalls = (grid: GridObject): GridObject => {
	return grid.map((row) => {
		return row.map((node) => {
			if (node.type === 'wall') {
				node.type = 'empty';
				return node;
			}
			return node;
		});
	});
};

export const getNodeSize = () => {
	let viewport = getViewportSize();
	switch (viewport) {
		case 'mobile':
			return 15;
		case 'tablet':
			return 20;
		case 'desktop':
			return 25;
		default:
			throw new Error('Viewport size not found');
	}
};

export const getAvaliableGridSpace = (ref: HTMLDivElement | null) => {
	if (!ref) return [];
	let size = getNodeSize() + 1;
	let widthInNodes = Math.floor((ref.clientWidth - 40) / size);
	let heightInNodes = Math.floor((ref.clientHeight - 60) / size);
	if (widthInNodes % 2 === 0) widthInNodes -= 1;
	if (heightInNodes % 2 === 0) heightInNodes -= 1;
	return [widthInNodes, heightInNodes];
};
