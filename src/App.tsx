import type { ReactElement } from 'react';
import { lazy } from 'react';
import './styles.css';

const Home = lazy(async () => import('pages/Home'));

export default function App(): ReactElement {
	return (
		<Home />
	)
}
