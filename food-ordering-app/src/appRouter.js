import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Body /> },
            { path: '/about', element: <About /> },
            { path: '/contact', element: <Contact /> },
            { path: '/cart', element: <Cart /> },
            { path: '/restaurants/:resName', element: <RestaurantMenu /> },
        ],
    },
]);

export default appRouter;
