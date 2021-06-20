//
import { useEffect, useReducer, useRef } from 'react';
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
	clearWalls,
	getAvaliableGridSpace,
} from './common/';
import {
	Grid,
	Dropdown,
	Option,
	Button,
	Column,
	Item,
	List,
	Radio,
	BigButton,
} from './component/';
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
			dState = minipulateNodes(dState, action.payload);
			return updateAlgorithm(dState);
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
		case 'clear-walls':
			dState = { ...dState, grid: clearWalls(dState.grid) };
			return { ...dState, ...updateAlgorithm(dState) };
		case 'create-grid':
			let { h, w } = action.payload;
			let grid = createGrid(h, w);
			dState.start = { x: 1, y: 1 };
			dState.goal = { x: w - 2, y: h - 2 };
			grid = placeFlag('start', dState.start, grid);
			grid = placeFlag('goal', dState.goal, grid);
			return { ...dState, grid };
		default:
			throw new Error('Reducer action not found');
	}
};

const App: React.FC = () => {
	const [state, dispatch] = useReducer(
		reducer,
		{
			grid: createGrid(5, 5),
			start: { x: 1, y: 1 },
			goal: { x: 3, y: 3 },
			isDragging: false,
			isSearching: false,
			wasSearch: false,
			speed: getSpeed({ id: 'fast' }),
		},
		init
	);
	const gridRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let [w, h] = getAvaliableGridSpace(gridRef.current);
		dispatch({ type: 'create-grid', payload: { w, h } });
	}, []);

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
		window.addEventListener('mouseup', mouseUp);
		dispatch({ type: 'toggle-dragging', payload: node.type });
		dispatch({ type: 'modify-nodes', payload: node });
	};

	const mouseEnter = (node: GridNode) => {
		dispatch({ type: 'modify-nodes', payload: node });
	};

	const mouseUp = () => {
		window.removeEventListener('mouseup', mouseUp);
		dispatch({ type: 'toggle-dragging' });
	};

	return (
		<div className='app'>
			<div className='app__layout'>
				<div className='column__1'>
					<div className='main__controls'>
						<div className='main__title'>Pathfinding Visualizer</div>
						<div className='big__screen'>
							<BigButton text='Visualize' onClick={() => startAlgorithm()} />
						</div>
						<Dropdown title={'Search Algorithms'}>
							<Option
								text={'A* Search'}
								onClick={() =>
									dispatch({
										type: 'change-algorithm',
										payload: { id: 'astar' },
									})
								}
							/>
							<Option
								text={'Dijkstra'}
								onClick={() =>
									dispatch({
										type: 'change-algorithm',
										payload: { id: 'dijkstra' },
									})
								}
							/>
							<Option
								text={'Depth First Search'}
								onClick={() =>
									dispatch({
										type: 'change-algorithm',
										payload: { id: 'depthfs' },
									})
								}
							/>
						</Dropdown>
						<Dropdown title={'Maze Algorithms'}>
							<Option
								text={'Recursive Division'}
								onClick={() =>
									dispatch({
										type: 'change-maze',
										payload: { id: 'recursive' },
									})
								}
							/>
							<Option
								text={'Random Maze'}
								onClick={() =>
									dispatch({ type: 'change-maze', payload: { id: 'random' } })
								}
							/>
						</Dropdown>
						<Button
							text='Clear path'
							onClick={() => dispatch({ type: 'clear-path' })}
						/>
						<Button
							text='Remove walls'
							onClick={() => dispatch({ type: 'clear-walls' })}
						/>
						<Radio>
							<Option
								text='Slow'
								active={state.speed.id === 'slow'}
								onClick={() =>
									dispatch({ type: 'change-speed', payload: { id: 'slow' } })
								}
							/>
							<Option
								text='Medium'
								active={state.speed.id === 'medium'}
								onClick={() =>
									dispatch({ type: 'change-speed', payload: { id: 'medium' } })
								}
							/>
							<Option
								text='Fast'
								active={state.speed.id === 'fast'}
								onClick={() =>
									dispatch({ type: 'change-speed', payload: { id: 'fast' } })
								}
							/>
						</Radio>
						<List title='Legend'>
							<Column>
								<Item text='Start' keyCol=' colour__start' />
								<Item text='Goal' keyCol=' colour__goal' />
								<Item text='Wall' keyCol=' colour__wall' />
							</Column>
							<Column>
								<Item text='Path' keyCol=' colour__path' />
								<Item text='Open set' keyCol=' colour__open' />
								<Item text='Closed set' keyCol=' colour__closed' />
							</Column>
						</List>
						<List title='Settings'>
							<Column>
								<Item
									text={
										'Search: ' +
										(state.algorithm ? state.algorithm?.name : 'Not selected')
									}
								/>
								<Item
									text={
										'Maze: ' + (state.maze ? state.maze?.name : 'Not selected')
									}
								/>
							</Column>
						</List>
						<div className='small__screen'>
							<BigButton text='Visualize' onClick={() => startAlgorithm()} />
						</div>
					</div>
				</div>
				<div className='column__2' ref={gridRef}>
					<Grid
						grid={state.grid}
						mouseDown={(n) => !state.isSearching && mouseDown(n)}
						mouseEnter={(n) =>
							!state.isSearching && state.isDragging && mouseEnter(n)
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
