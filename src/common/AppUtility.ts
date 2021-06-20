//
import { AppState, GridNode, Speed, SpeedId } from '../model';

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
					if (node.type === 'wall' || node.type === 'empty') {
						node.overided = node.type;
					}
					let st = state.grid[state.start.y][state.start.x];
					st.type = 'empty';
					if (st.overided) {
						st.type = st.overided;
						delete st.overided;
					}
					state.start = node.pos;
					return { ...state };
				}
			}
			break;
		case 'goal':
			if (node.type !== 'start') {
				if (state.goal.y !== node.pos.y || state.goal.x !== node.pos.x) {
					state.grid[node.pos.y][node.pos.x].type = 'goal';
					if (node.type === 'wall' || node.type === 'empty') {
						node.overided = node.type;
					}
					let go = state.grid[state.goal.y][state.goal.x];
					go.type = 'empty';
					if (go.overided) {
						go.type = go.overided;
						delete go.overided;
					}
					state.goal = node.pos;
					return { ...state };
				}
			}
			break;
	}
	return state;
};

export const getSpeed = ({ id }: SpeedId): Speed => {
	switch (id) {
		case 'slow':
			return { id: 'slow', rate: 100 };
		case 'medium':
			return { id: 'medium', rate: 50 };
		case 'fast':
			return { id: 'fast', rate: 1 };
		default:
			throw new Error('Speed not found');
	}
};

export const getViewportSize = () => {
	let w = window.innerWidth;
	if (w < 700) {
		return 'mobile';
	} else if (w < 1100) {
		return 'tablet';
	} else {
		return 'desktop';
	}
};
