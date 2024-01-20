import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { NEWS_API_URL } from '@/config';
import { INews } from '@/types';
import { Card, Layout, Pagination, Searchbar } from '@/components';
import { useFetch } from '@/hooks';

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchString, setSearchString] = useState('');
	const search = searchParams.get('s');

	const [page, setPage] = useState(1);

	const handleSearch = () => {
		setSearchParams({
			s: searchString,
		});
	};

	const { data, isLoading } = useFetch<{
		articles: INews[];
		totalResults: number;
	}>(
		`${NEWS_API_URL}&pageSize=${8}&page=${page}&q=${search ? search : 'Steam'}`
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Layout>
			<main className='w-full flex justify-center gap-2 flex-col'>
				<div className='mx-auto flex items-center gap-2 w-1/2'>
					<label
						className='w-36'
						htmlFor=''>
						Найти новость:
					</label>
					<Searchbar
						onSearch={handleSearch}
						defaultValue={searchString}
						onChange={(e) => setSearchString(e.target.value)}
					/>
				</div>
				<div className='w-full justify-center gap-4 flex flex-wrap'>
					{data?.articles.map((a) => (
						<Card
							key={a.title}
							description={a.description}
							title={a.title}
							urlToImage={a.urlToImage}
							url={a.url}
							author={a.author}
						/>
					))}
				</div>
				<Pagination
					setPage={setPage}
					currentPage={page}
					pageCount={Math.ceil(data?.totalResults! / 8)}
				/>
			</main>
		</Layout>
	);
}
