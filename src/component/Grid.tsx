//

import { GridObject } from '../model';
import '../style/grid.css';

interface Props {
	grid: GridObject;
}

const Grid: React.FC<Props> = ({ grid }) => {
	return (
		<div>
			{grid.map((row) => {
				{
					return (
						<div className='grid__row'>
							{row.map((node) => {
								return <div className='grid__node'></div>;
							})}
						</div>
					);
				}
			})}
		</div>
	);
};

export default Grid;
