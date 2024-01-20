import { useLocation } from 'react-router-dom';

export default function ErrorPage() {
	const location = useLocation();
	return (
		<main className='grid h-screen place-content-center bg-white px-4'>
			<h1 className='uppercase tracking-widest text-gray-500'>
				{location.state?.error
					? location.state?.error?.message
					: 'Упс... Произошла нейзвестная ошибка'}
			</h1>
		</main>
	);
}
