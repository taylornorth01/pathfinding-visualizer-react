//

import { GridObject } from '../model';

interface Props {
	grid: GridObject;
}

const Grid: React.FC<Props> = ({ grid }) => {
	return (
		<div>
			{grid.map((row) => {
				{
					return row.map((node) => {
						return <div>{node.type}</div>;
					});
				}
			})}
		</div>
	);
};

export default Grid;
