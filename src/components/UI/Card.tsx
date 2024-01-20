import { Link } from 'react-router-dom';
import { FC, Ref } from 'react';

import { INews } from '@/types';

interface CardProps extends INews {
	forwardRef?: Ref<HTMLAnchorElement>;
}

export const Card: FC<CardProps> = ({
	title,
	urlToImage,
	description,
	forwardRef,
}) => {
	return (
		<Link
			ref={forwardRef}
			to={`/news/${title}`}
			className='block  lg:w-96 border'>
			<img
				alt='Art'
				src={
					urlToImage
						? urlToImage
						: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png'
				}
				className='h-64 w-full object-cover sm:h-80 lg:h-96'
			/>
			<h3 className='mt-4 text-lg font-bold text-gray-900 sm:text-xl'>
				{title.substring(0, 50)}
			</h3>

			<p className='mt-2 max-w-sm text-gray-700'>
				{description.substring(0, 100) + '...'}
			</p>
		</Link>
	);
};
