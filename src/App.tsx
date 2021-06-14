//
import { useReducer } from 'react';
import './app.css';
import { createGrid } from './common/';
import { Grid } from './model/';

interface State {
	grid?: Grid;
}

type Actions = { type: 'example' };

const reducer = (state: State, action: Actions) => {
	switch (action.type) {
		case 'example':
			return state;
		default:
			throw new Error('Reducer action not found');
	}
};

const App: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, { grid: createGrid(5, 5) });

	return <div className='app'>{JSON.stringify(state.grid)}</div>;
};

export default App;
