import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import { INews } from '@/types';

export const ArticleContext = createContext<{
	currentNews?: INews | null;
	setCurrentNews?: Dispatch<SetStateAction<INews | null>>;
}>({});

export function ArticleContextWrapper({ children }: { children: ReactNode }) {
	const [currentNews, setCurrentNews] = useState<INews | null>(null);

	return (
		<ArticleContext.Provider value={{ currentNews, setCurrentNews }}>
			{children}
		</ArticleContext.Provider>
	);
}
