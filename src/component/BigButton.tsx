//
import '../style/bigbutton.css';

interface Props {
	text: string;
	onClick: React.MouseEventHandler;
}

export const BigButton: React.FC<Props> = ({ text, onClick }) => {
	return (
		<div className='big__button' onClick={onClick}>
			{text}
		</div>
	);
};
