import { ReactNode } from 'react';

import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
