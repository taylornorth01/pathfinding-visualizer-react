//
import { AppState, GridNode } from '../model';

export const minipulateNodes = (state: AppState, node: GridNode): AppState => {
	switch (state.placeType) {
		case 'empty':
			if (node.type !== 'start' && node.type !== 'goal') {
				state.grid[node.pos.y][node.pos.x].type = 'wall';
				return { ...state };
			}
			break;
		case 'wall':
			if (node.type !== 'start' && node.type !== 'goal') {
				state.grid[node.pos.y][node.pos.x].type = 'empty';
				return { ...state };
			}
			break;
		case 'start':
			if (node.type !== 'goal') {
				if (state.start.y !== node.pos.y || state.start.x !== node.pos.x) {
					state.grid[node.pos.y][node.pos.x].type = 'start';
					state.grid[state.start.y][state.start.x].type = 'empty';
					state.start = node.pos;
					return { ...state };
				}
			}
			break;
		case 'goal':
			if (node.type !== 'start') {
				if (state.goal.y !== node.pos.y || state.goal.x !== node.pos.x) {
					state.grid[node.pos.y][node.pos.x].type = 'goal';
					state.grid[state.goal.y][state.goal.x].type = 'empty';
					state.goal = node.pos;
					return { ...state };
				}
			}
			break;
	}
	return state;
};
