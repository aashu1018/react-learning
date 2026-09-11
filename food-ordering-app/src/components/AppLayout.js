import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => (
    <div className="app">
        <Header />
        <Outlet />
    </div>
);

export default AppLayout;
