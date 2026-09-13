import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    addItemToCart,
    cartTotals,
    itemVertical,
    removeItemFromCart,
    updateItemQuantity,
} from '../utils/cart';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'quickbite-cart';

const readStoredCart = () => {
    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(readStoredCart);
    const [toast, setToast] = useState(null);
    const [pendingItem, setPendingItem] = useState(null);
    const toastTimer = useRef(null);

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    useEffect(() => () => window.clearTimeout(toastTimer.current), []);

    const showToast = (name) => {
        window.clearTimeout(toastTimer.current);
        setToast({ name });
        toastTimer.current = window.setTimeout(() => setToast(null), 2800);
    };

    const value = useMemo(() => {
        const bill = cartTotals(items);

        const addItem = (item) => {
            if (items.length && itemVertical(items[0]) !== itemVertical(item)) {
                setPendingItem(item);
                return;
            }

            setItems((prev) => addItemToCart(prev, item));
            showToast(item.name);
        };

        return {
            items,
            toast,
            pendingItem,
            ...bill,
            addItem,
            increaseItem: (itemId) =>
                setItems((prev) => {
                    const current = prev.find((entry) => entry.id === itemId);
                    return current
                        ? updateItemQuantity(prev, itemId, current.quantity + 1)
                        : prev;
                }),
            decreaseItem: (itemId) =>
                setItems((prev) => {
                    const current = prev.find((entry) => entry.id === itemId);
                    return current
                        ? updateItemQuantity(prev, itemId, current.quantity - 1)
                        : prev;
                }),
            removeItem: (itemId) => setItems((prev) => removeItemFromCart(prev, itemId)),
            clearCart: () => setItems([]),
            confirmReplace: () => {
                if (!pendingItem) {
                    return;
                }
                setItems(addItemToCart([], pendingItem));
                showToast(pendingItem.name);
                setPendingItem(null);
            },
            cancelReplace: () => setPendingItem(null),
        };
    }, [items, toast, pendingItem]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export default CartProvider;
