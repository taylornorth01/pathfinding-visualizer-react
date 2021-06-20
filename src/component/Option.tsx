//
interface Props {
	text: string;
	onClick?: React.MouseEventHandler;
}

export const Option: React.FC<Props> = ({ text, onClick }) => {
	return <li onClick={(e) => onClick && onClick(e)}>{text}</li>;
};
