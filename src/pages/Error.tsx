import { useLocation } from 'react-router-dom';

export default function ErrorPage() {
	const location = useLocation();
	console.log(location.state);
	return <div>Error</div>;
}
