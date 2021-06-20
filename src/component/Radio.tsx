//
import '../style/radio.css';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const Radio: React.FC<Props> = ({ children }) => {
	return (
		<div className='radio__buttons'>
			<ul>{children}</ul>
		</div>
	);
};
