//
import { GridNode, GridObject } from '../model';
import '../style/grid.css';

interface Props {
	grid: GridObject;
	mouseDown: (node: GridNode) => void;
	mouseEnter: (node: GridNode) => void;
}

export const Grid: React.FC<Props> = ({ grid, mouseDown, mouseEnter }) => {
	const getNodeClass = (node: GridNode) => {
		switch (node.type) {
			case 'wall':
				return ' colour__wall';
			case 'start':
				return ' colour__start';
			case 'goal':
				return ' colour__goal';
			default:
				switch (node.state) {
					case 'closed':
						return ' colour__closed';
					case 'open':
						return ' colour__open';
					case 'path':
						return ' colour__path';
					case 'current':
						return ' colour__current';
					default:
						return '';
				}
		}
	};

	return (
		<div>
			{grid.map((row, rowIdx) => {
				return (
					<div className='grid__row' key={rowIdx}>
						{row.map((node, nodeIdx) => {
							return (
								<div
									className={'grid__node' + getNodeClass(node)}
									onMouseDown={() => mouseDown(node)}
									onMouseEnter={() => mouseEnter(node)}
									key={nodeIdx}>
									{node.type}
									<br />
									{node.state}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
