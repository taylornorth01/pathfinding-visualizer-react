//
import { NodeColour } from '../model';

interface Props {
	text: string;
	keyCol?: NodeColour;
}

export const Item: React.FC<Props> = ({ text, keyCol }) => {
	return (
		<div className='list__item'>
			{keyCol && <div className={'list__key ' + keyCol} />}
			{text}
		</div>
	);
};
