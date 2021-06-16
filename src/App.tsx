//
import { useReducer } from 'react';
import './App.css';
import {
	createGrid,
	placeFlag,
	minipulateNodes,
	getAlgorithmObject,
} from './common/';
import Grid from './component/Grid';
import { GridNode, AppState, AppActions } from './model/';

var _ = require('lodash');

const init = (initial: AppState) => {
	initial.grid = placeFlag('start', initial.start, initial.grid);
	initial.grid = placeFlag('goal', initial.goal, initial.grid);
	return initial;
};

const reducer = (state: AppState, action: AppActions) => {
	let dState: AppState = _.cloneDeep(state);

	switch (action.type) {
		case 'toggle-dragging':
			return {
				...dState,
				isDragging: !dState.isDragging,
				placeType: action.payload,
			};
		case 'modify-nodes':
			return { ...dState, ...minipulateNodes(dState, action.payload) };
		case 'change-algorithm':
			return {
				...dState,
				algorithm: getAlgorithmObject(dState, action.payload),
			};
		case 'update-grid':
			action.payload.map(
				(node) => (dState.grid[node.pos.y][node.pos.x].state = node.state)
			);
			return { ...dState };
		case 'draw-path':
			dState.grid[action.payload.pos.y][action.payload.pos.x].state =
				action.payload.state;
			return { ...dState };
		case 'toggle-searching':
			return { ...dState, isSearching: !dState.isSearching };
		default:
			throw new Error('Reducer action not found');
	}
};

const App: React.FC = () => {
	const [state, dispatch] = useReducer(
		reducer,
		{
			grid: createGrid(5, 5),
			start: { x: 0, y: 0 },
			goal: { x: 4, y: 4 },
			isDragging: false,
			isSearching: false,
		},
		init
	);

	const startAlgorithm = async () => {
		dispatch({ type: 'toggle-searching' });
		if (!state.algorithm) return;
		let algorithm = state.algorithm.get();
		let path: GridNode[] = [];
		while (true) {
			let step: any = await new Promise((res) => {
				setTimeout(() => {
					res(algorithm?.step());
				}, 100);
			});
			if (step.modified) {
				dispatch({ type: 'update-grid', payload: step.modified });
				continue;
			}
			path = step.path;
			break;
		}
		while (true) {
			let step: any = await new Promise((res) => {
				setTimeout(() => {
					res(path.shift());
				}, 100);
			});
			if (step) {
				dispatch({ type: 'draw-path', payload: step });
				continue;
			}
			break;
		}
		dispatch({ type: 'toggle-searching' });
	};

	const mouseDown = (node: GridNode) => {
		console.log('Mouse down event', node);
		window.addEventListener('mouseup', mouseUp);
		dispatch({ type: 'toggle-dragging', payload: node.type });
		dispatch({ type: 'modify-nodes', payload: node });
	};

	const mouseEnter = (node: GridNode) => {
		console.log('Mouse enter event', node);
		dispatch({ type: 'modify-nodes', payload: node });
	};

	const mouseUp = () => {
		window.removeEventListener('mouseup', mouseUp);
		dispatch({ type: 'toggle-dragging' });
	};

	return (
		<div className='app'>
			{state.algorithm?.id}
			{state.algorithm?.name}
			<div onClick={startAlgorithm}>Start</div>
			<div
				onClick={() =>
					dispatch({ type: 'change-algorithm', payload: { id: 'dijkstra' } })
				}>
				Test dij
			</div>
			<div
				onClick={() =>
					dispatch({ type: 'change-algorithm', payload: { id: 'astar' } })
				}>
				Test astar
			</div>
			<Grid
				grid={state.grid}
				mouseDown={(n) => !state.isSearching && mouseDown(n)}
				mouseEnter={(n) =>
					!state.isSearching && state.isDragging && mouseEnter(n)
				}
			/>
			{JSON.stringify(state)}
		</div>
	);
};

export default App;
