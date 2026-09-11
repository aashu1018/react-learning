import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import appRouter from './appRouter';
import { CartProvider } from './components/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
        <RouterProvider router={appRouter} />
    </CartProvider>
);
