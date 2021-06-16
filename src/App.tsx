//
import { useReducer } from 'react';
import './App.css';
import {
	createGrid,
	placeFlag,
	minipulateNodes,
	getAlgorithmObject,
	clearPath,
	getSpeed,
	updateAlgorithm,
	mapNodesStateToGrid,
	getMazeObject,
	updateMaze,
} from './common/';
import { Grid } from './component/';
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
			dState = { ...dState, ...minipulateNodes(dState, action.payload) };
			return { ...dState, ...updateAlgorithm(dState) };
		case 'change-algorithm':
			return {
				...dState,
				grid: clearPath(dState.grid),
				algorithm: getAlgorithmObject(dState, action.payload),
				wasSearch: false,
			};
		case 'update-grid':
			return {
				...dState,
				grid: mapNodesStateToGrid(action.payload, dState.grid),
			};
		case 'draw-path':
			dState.grid[action.payload.pos.y][action.payload.pos.x].state =
				action.payload.state;
			return { ...dState };
		case 'toggle-searching':
			return { ...dState, isSearching: !dState.isSearching };
		case 'clear-path':
			return { ...dState, grid: clearPath(dState.grid), wasSearch: false };
		case 'change-speed':
			return { ...dState, speed: getSpeed(action.payload) };
		case 'set-was-search':
			return { ...dState, wasSearch: action.payload };
		case 'change-maze':
			dState.maze = getMazeObject(action.payload, dState.grid);
			return { ...dState, ...updateMaze(dState) };
		default:
			throw new Error('Reducer action not found');
	}
};

const App: React.FC = () => {
	const [state, dispatch] = useReducer(
		reducer,
		{
			grid: createGrid(15, 25),
			start: { x: 1, y: 1 },
			goal: { x: 3, y: 3 },
			isDragging: false,
			isSearching: false,
			wasSearch: false,
			speed: getSpeed({ id: 'fast' }),
		},
		init
	);

	const startAlgorithm = async () => {
		if (!state.algorithm) return;
		dispatch({ type: 'toggle-searching' });
		dispatch({ type: 'clear-path' });
		let algorithm = state.algorithm.get();
		let path: GridNode[] = [];
		while (true) {
			let step: any = await new Promise((res) => {
				setTimeout(() => {
					res(algorithm?.step());
				}, state.speed.rate);
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
				setTimeout(
					() => {
						res(path.shift());
					},
					state.speed.rate < 10 ? 10 : state.speed.rate * 0.5
				);
			});
			if (step) {
				dispatch({ type: 'draw-path', payload: step });
				continue;
			}
			break;
		}
		dispatch({ type: 'toggle-searching' });
		dispatch({ type: 'set-was-search', payload: true });
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
					dispatch({ type: 'change-maze', payload: { id: 'recursive' } })
				}>
				Recursive
			</div>
			<div
				onClick={() =>
					dispatch({ type: 'change-maze', payload: { id: 'random' } })
				}>
				Random
			</div>
			<div
				onClick={() =>
					dispatch({ type: 'change-speed', payload: { id: 'slow' } })
				}>
				Slow
			</div>
			<div
				onClick={() =>
					dispatch({ type: 'change-speed', payload: { id: 'medium' } })
				}>
				Medium
			</div>
			<div
				onClick={() =>
					dispatch({ type: 'change-speed', payload: { id: 'fast' } })
				}>
				Fast
			</div>
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
			<div
				onClick={() =>
					dispatch({ type: 'change-algorithm', payload: { id: 'depthfs' } })
				}>
				Test depthfs
			</div>
			<Grid
				grid={state.grid}
				mouseDown={(n) => !state.isSearching && mouseDown(n)}
				mouseEnter={(n) =>
					!state.isSearching && state.isDragging && mouseEnter(n)
				}
			/>
			{/* {JSON.stringify(state)} */}
		</div>
	);
};

export default App;
