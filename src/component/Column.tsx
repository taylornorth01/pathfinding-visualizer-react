//
interface Props {
	children: JSX.Element | JSX.Element[];
}

export const Column: React.FC<Props> = ({ children }) => {
	return <div className='list__col'>{children}</div>;
};
