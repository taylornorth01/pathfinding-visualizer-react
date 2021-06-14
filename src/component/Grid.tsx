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
			{grid.map((row) => {
				{
					return (
						<div className='grid__row'>
							{row.map((node) => {
								return (
									<div
										className='grid__node'
										onMouseDown={() => mouseDown(node)}
										onMouseEnter={() => mouseEnter(node)}>
										{node.type}
									</div>
								);
							})}
						</div>
					);
				}
			})}
		</div>
	);
};

export default Grid;
