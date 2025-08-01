import { createBrowserRouter, Navigate } from 'react-router';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import Layout from './Components/Layout/Layout.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import CardDetailPage from './pages/DetailsPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to="/1" replace />,
      },
      {
        path: ':page',
        Component: HomePage,
        children: [
          {
            path: ':detail',
            Component: CardDetailPage,
          },
        ],
      },
      {
        path: 'about',
        Component: AboutPage,
      },
    ],
  },
  {
    path: 'not-found',
    Component: NotFoundPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);

export default router;
