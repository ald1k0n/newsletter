import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

interface IProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode;
}

export const Button: FC<IProps> = (props) => {
	return (
		<button
			{...props}
			className={`${props.className} w-full`}>
			Button
		</button>
	);
};
