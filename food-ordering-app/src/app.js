import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from 'url:./assets/Logo.png';
import Header from './components/Header';
import Body from './components/Body';
import restaurants from './assets/MockData';

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body restaurants={restaurants} />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
