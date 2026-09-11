import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppLayout from './components/AppLayout';
import Body from './components/Body';
import Error from './components/Error';
import Shimmer from './components/Shimmer';

const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Cart = lazy(() => import('./components/Cart'));
const Payment = lazy(() => import('./components/Payment'));
const RestaurantMenu = lazy(() => import('./components/RestaurantMenu'));

const withSuspense = (element) => <Suspense fallback={<Shimmer />}>{element}</Suspense>;

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Body /> },
            { path: '/about', element: withSuspense(<About />) },
            { path: '/contact', element: withSuspense(<Contact />) },
            { path: '/cart', element: withSuspense(<Cart />) },
            { path: '/payment', element: withSuspense(<Payment />) },
            { path: '/restaurants/:resName', element: withSuspense(<RestaurantMenu />) },
        ],
    },
]);

export default appRouter;
