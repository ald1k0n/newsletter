import { useState, useEffect } from 'react';

export function useFetch(url: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const refetch = async () => {
		setIsLoading(true);
		const fetchedData = await fetch(url, {
			method: 'GET',
		})
			.then((res) => res.json())
			.catch((reason) => {
				setIsError(true);
				setError(reason);
			})
			.finally(() => setIsLoading(false));
		setData(fetchedData);
	};

	useEffect(() => {
		(async () => refetch())();
		return () => {
			setIsLoading(false);
			setIsError(false);
			setError(null);
			setData(null);
		};
	}, [url]);

	return { data, isLoading, isError, error, refetch };
}
