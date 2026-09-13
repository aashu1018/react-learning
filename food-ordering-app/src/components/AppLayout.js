import { Outlet } from 'react-router-dom';
import Header from './Header';
import OfflineBanner from './OfflineBanner';
import useOnlineStatus from '../hooks/useOnlineStatus';

const AppLayout = () => {
    const isOnline = useOnlineStatus();

    if (!isOnline) {
        return <OfflineBanner />;
    }

    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};

export default AppLayout;
