import { useState } from 'react';

import { NEWS_API_URL } from '@/config';
import { INews } from '@/types';
import { Card, Header, Pagination } from '@/components';
import { useFetch } from '@/hooks';

export default function Home() {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useFetch<{
		articles: INews[];
		totalResults: number;
	}>(`${NEWS_API_URL}&pageSize=${8}&page=${page}&q=${'Steam'}`);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<main className='w-full flex justify-center flex-col'>
				<div className='w-full justify-center gap-4 flex flex-wrap'>
					{data?.articles.map((a) => (
						<Card
							key={a.title}
							description={a.description}
							title={a.title}
							urlToImage={a.urlToImage}
						/>
					))}
				</div>
				<Pagination
					setPage={setPage}
					currentPage={page}
					pageCount={Math.ceil(data?.totalResults! / 8)}
				/>
			</main>
		</>
	);
}
