//
import '../style/list.css';

interface Props {
	title: string;
	children: JSX.Element | JSX.Element[];
}

export const List: React.FC<Props> = ({ title, children }) => {
	return (
		<div className='list__container'>
			<div className='list__title'>{title}</div>
			<div className='list__row'>{children}</div>
		</div>
	);
};
