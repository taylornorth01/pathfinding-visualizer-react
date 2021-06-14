//
import { useReducer } from 'react';
import './app.css';
import { createGrid, placeFlag } from './common/';
import Grid from './component/Grid';
import { GridNode, AppState, AppActions } from './model/';

var _ = require('lodash');

const init = (initial: AppState) => {
	initial.grid = placeFlag('start', initial.start, initial.grid);
	initial.grid = placeFlag('goal', initial.goal, initial.grid);
	return initial;
};

const reducer = (state: AppState, action: AppActions) => {
	let dState = _.cloneDeep(state);

	switch (action.type) {
		case 'toggle-dragging':
			return {
				...dState,
				isDragging: !dState.isDragging,
				placeType: action.payload,
			};
		case 'place-node':
			return { ...dState };
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
			placeType: undefined,
		},
		init
	);

	const mouseDown = (node: GridNode) => {
		console.log('Mouse down event', node);
		window.addEventListener('mouseup', mouseUp);
		dispatch({ type: 'toggle-dragging', payload: node.type });
	};

	const mouseEnter = (node: GridNode) => {
		console.log('Mouse enter event', node);
		dispatch({ type: 'place-node', payload: node });
	};

	const mouseUp = () => {
		window.removeEventListener('mouseup', mouseUp);
		dispatch({ type: 'toggle-dragging' });
	};

	return (
		<div className='app'>
			{JSON.stringify(state)}
			<Grid
				grid={state.grid}
				mouseDown={(n) => mouseDown(n)}
				mouseEnter={(n) => state.isDragging && mouseEnter(n)}
			/>
		</div>
	);
};

export default App;
