//

import { GridNode, GridObject } from '../model';
import '../style/grid.css';

interface Props {
	grid: GridObject;
	mouseDown: (node: GridNode) => void;
	mouseEnter: (node: GridNode) => void;
}

const Grid: React.FC<Props> = ({ grid, mouseDown, mouseEnter }) => {
	return (
		<div>
			{grid.map((row, rowIdx) => {
				return (
					<div className='grid__row' key={rowIdx}>
						{row.map((node, nodeIdx) => {
							return (
								<div
									className='grid__node'
									onMouseDown={() => mouseDown(node)}
									onMouseEnter={() => mouseEnter(node)}
									key={nodeIdx}>
									{node.type}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Grid;
