import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { ArticleContextWrapper, UserContext } from './contexts';

const HomePage = lazy(() => import('@/pages/Home'));
const ErrorPage = lazy(() => import('@/pages/Error'));
const ArticlePage = lazy(() => import('@/pages/Article'));

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<ArticleContextWrapper>
					<UserContext>
						<Routes>
							<Route
								path='/*'
								element={<HomePage />}
							/>

							<Route
								path='/news/:title'
								element={<ArticlePage />}
							/>

							<Route
								path='*'
								element={<ErrorPage />}
							/>
						</Routes>
					</UserContext>
				</ArticleContextWrapper>
			</Suspense>
		</BrowserRouter>
	);
}
