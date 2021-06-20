//
import { useState } from 'react';
import { ListIcon } from '../icon';
import '../style/dropdown.css';

interface Props {
	title: string;
	children?: JSX.Element | JSX.Element[];
}

export const Dropdown: React.FC<Props> = ({ title, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className='dropdown' onBlur={() => setOpen(false)} tabIndex={0}>
			<div
				className='title__container'
				onMouseDown={() => (open ? setOpen(false) : setOpen(true))}>
				<ListIcon size={24} />
				<span>{title}</span>
			</div>
			{open && <ul>{children}</ul>}
		</div>
	);
};
