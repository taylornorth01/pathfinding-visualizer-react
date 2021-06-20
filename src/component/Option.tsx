//
interface Props {
	text: string;
	onClick?: React.MouseEventHandler;
	active?: boolean;
}

export const Option: React.FC<Props> = ({ text, onClick, active }) => {
	return (
		<li
			onClick={(e) => onClick && onClick(e)}
			className={active ? 'active' : ''}>
			{text}
		</li>
	);
};
