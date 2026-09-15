import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import OfflineBanner from './OfflineBanner';
import CartToast from './CartToast';
import CartDrawer from './CartDrawer';
import CartReplaceDialog from './CartReplaceDialog';
import useOnlineStatus from '../hooks/useOnlineStatus';

const AppLayout = () => {
    const isOnline = useOnlineStatus();

    if (!isOnline) {
        return <OfflineBanner />;
    }

    return (
        <div className="app">
            <Header />
            <main className="app-main">
                <Outlet />
            </main>
            <Footer />
            <MobileNav />
            <CartToast />
            <CartDrawer />
            <CartReplaceDialog />
        </div>
    );
};

export default AppLayout;
