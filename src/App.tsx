import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import { UserContext } from './contexts';

const HomePage = lazy(() => import('@/pages/Home'));
const ErrorPage = lazy(() => import('@/pages/Error'));

export default function App() {
	return (
		<BrowserRouter>
			<UserContext>
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>

					<Route
						path='*'
						element={<ErrorPage />}
					/>
				</Routes>
			</UserContext>
		</BrowserRouter>
	);
}
