import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartProvider, { useCart } from '../../src/components/CartProvider.js';
import CartDrawer from '../../src/components/CartDrawer.js';
import CartToast from '../../src/components/CartToast.js';
import CartReplaceDialog from '../../src/components/CartReplaceDialog.js';
import QtyControl from '../../src/components/QtyControl.js';

const dosa = { id: 'd1', name: 'Masala Dosa', price: 120, isVeg: true, restaurantName: 'Test Kitchen', vertical: 'food' };
const milk = { id: 'g1', name: 'Milk', price: 30, vertical: 'grocery' };

const Shell = () => {
    const { itemCount, openCart } = useCart();
    return (
        <>
            <button type="button" onClick={openCart}>
                Open cart ({itemCount})
            </button>
            <section aria-label="dosa">
                <QtyControl payload={dosa} />
            </section>
            <section aria-label="milk">
                <QtyControl payload={milk} />
            </section>
            <CartToast />
            <CartDrawer />
            <CartReplaceDialog />
        </>
    );
};

const renderShell = () =>
    render(
        <CartProvider>
            <MemoryRouter>
                <Shell />
            </MemoryRouter>
        </CartProvider>
    );

const addDosa = () => fireEvent.click(within(screen.getByLabelText('dosa')).getByRole('button', { name: 'Add' }));
const addMilk = () => fireEvent.click(within(screen.getByLabelText('milk')).getByRole('button', { name: 'Add' }));
const openDrawer = () => fireEvent.click(screen.getByRole('button', { name: /Open cart/ }));
const drawer = () => screen.getByRole('dialog', { name: 'Your cart' });

beforeEach(() => window.localStorage.clear());

describe('add to cart -> toast -> drawer', () => {
    it('keeps the drawer hidden until the cart is opened', () => {
        renderShell();
        expect(screen.queryByRole('dialog', { name: 'Your cart' })).toBeNull();
        openDrawer();
        expect(drawer()).not.toBeNull();
    });

    it('adds an item, swaps Add for a stepper, toasts, and lists it in the drawer with the bill', () => {
        renderShell();
        addDosa();

        expect(within(screen.getByLabelText('dosa')).getByText('1')).not.toBeNull();
        expect(screen.getByRole('status').textContent).toContain('Masala Dosa added');
        expect(screen.getByRole('button', { name: 'Open cart (1)' })).not.toBeNull();

        fireEvent.click(screen.getByRole('button', { name: 'View cart' }));
        const cart = within(drawer());
        expect(cart.getByText('Masala Dosa')).not.toBeNull();
        // 120 + 40 delivery + 5 platform + 8 GST
        expect(cart.getByRole('link', { name: 'Checkout · ₹173' })).not.toBeNull();
    });

    it('updates quantity and the bill from inside the drawer, then empties out', () => {
        renderShell();
        addDosa();
        openDrawer();

        fireEvent.click(within(drawer()).getByRole('button', { name: 'Increase Masala Dosa' }));
        // 240 is over the free-delivery line: 240 + 0 + 5 + 12 GST
        expect(within(drawer()).getByRole('link', { name: 'Checkout · ₹257' })).not.toBeNull();
        expect(screen.getByRole('button', { name: 'Open cart (2)' })).not.toBeNull();

        fireEvent.click(within(drawer()).getByRole('button', { name: 'Decrease Masala Dosa' }));
        fireEvent.click(within(drawer()).getByRole('button', { name: 'Decrease Masala Dosa' }));
        expect(within(drawer()).getByText('Your cart is empty.')).not.toBeNull();
        expect(within(drawer()).queryByRole('link', { name: /Checkout/ })).toBeNull();
    });

    it('removes a line with Remove', () => {
        renderShell();
        addDosa();
        openDrawer();
        fireEvent.click(within(drawer()).getByRole('button', { name: 'Remove' }));
        expect(within(drawer()).getByText('Your cart is empty.')).not.toBeNull();
    });

    it('closes on Escape and gives page scrolling back', () => {
        renderShell();
        openDrawer();
        expect(document.body.style.overflow).toBe('hidden');
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(screen.queryByRole('dialog', { name: 'Your cart' })).toBeNull();
        expect(document.body.style.overflow).toBe('');
    });
});

describe('cart rules', () => {
    it('asks before replacing a food cart with a grocery item, and honours "Keep current cart"', () => {
        renderShell();
        addDosa();
        addMilk();

        const dialog = screen.getByRole('dialog', { name: 'Replace your cart?' });
        fireEvent.click(within(dialog).getByRole('button', { name: 'Keep current cart' }));

        expect(screen.queryByRole('dialog', { name: 'Replace your cart?' })).toBeNull();
        openDrawer();
        expect(within(drawer()).getByText('Masala Dosa')).not.toBeNull();
        expect(within(drawer()).queryByText('Milk')).toBeNull();
    });

    it('replaces the cart when the user confirms', () => {
        renderShell();
        addDosa();
        addMilk();
        fireEvent.click(screen.getByRole('button', { name: 'Replace and add' }));

        openDrawer();
        expect(within(drawer()).getByText('Milk')).not.toBeNull();
        expect(within(drawer()).queryByText('Masala Dosa')).toBeNull();
    });

    it('survives a reload (cart is restored from localStorage)', () => {
        const first = renderShell();
        addDosa();
        first.unmount();

        renderShell();
        expect(screen.getByRole('button', { name: 'Open cart (1)' })).not.toBeNull();
    });
});
