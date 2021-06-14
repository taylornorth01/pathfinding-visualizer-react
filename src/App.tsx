//
import { useReducer } from 'react';
import './app.css';
import { createGrid, placeFlag } from './common/';
import Grid from './component/Grid';
import { GridNode, GridObject, Position } from './model/';

interface State {
	grid: GridObject;
	start: Position;
	goal: Position;
}

type Actions = { type: 'example' };

const init = (initial: State) => {
	initial.grid = placeFlag('start', initial.start, initial.grid);
	initial.grid = placeFlag('goal', initial.goal, initial.grid);
	return initial;
};

const reducer = (state: State, action: Actions) => {
	switch (action.type) {
		case 'example':
			return state;
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
		},
		init
	);

	const mouseDown = (node: GridNode) => {
		console.log('Mouse down event', node);
	};

	return (
		<div className='app'>
			<Grid grid={state.grid} mouseDown={(node) => mouseDown(node)} />
		</div>
	);
};

export default App;
