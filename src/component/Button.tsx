//
import '../style/button.css';

interface Props {
	text: string;
	onClick: React.MouseEventHandler;
}

export const Button: React.FC<Props> = ({ text, onClick }) => {
	return (
		<div className='button' onClick={onClick}>
			{text}
		</div>
	);
};
