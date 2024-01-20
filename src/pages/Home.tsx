import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NEWS_API_URL, API_KEY } from '@/config';
import { useFetch } from '@/hooks';

export default function Home() {
	const navigate = useNavigate();
	const [search, setSearch] = useState('Казахстан');
	const [limit, setLimit] = useState(5);
	const [apiUrl] = useState(
		`${NEWS_API_URL}everything?apiKey=${API_KEY}&q=${search}&pageSize=${limit}`
	);

	const { data, isLoading, isError, error } = useFetch(apiUrl);

	if (isLoading) return <div>Loading...</div>;

	if (isError)
		navigate('/error', {
			state: { error },
		});
	// console.log(data);
	return <div>Home</div>;
}
