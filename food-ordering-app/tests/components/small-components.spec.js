import { act, fireEvent, render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import CartProvider from '../../src/components/CartProvider.js';
import Header from '../../src/components/Header.js';
import OrderStatusTimeline from '../../src/components/OrderStatusTimeline.js';
import RestaurantList from '../../src/components/RestaurantList.js';

describe('RestaurantList + withPromotedLabel', () => {
    const restaurants = [
        { id: 1, name: 'Alpha Kitchen', cuisines: ['Biryani'], costForTwo: 300, rating: 4.6, deliveryTime: 20, image: 'a.jpg', promoted: true },
        { id: 2, name: 'Beta Bites', cuisines: ['Pizza'], costForTwo: 400, rating: 4.0, deliveryTime: 30, image: 'b.jpg', promoted: false },
    ];

    it('labels only the promoted restaurant', () => {
        render(
            <MemoryRouter>
                <RestaurantList restaurants={restaurants} />
            </MemoryRouter>
        );

        expect(screen.getAllByText('Promoted')).toHaveLength(1);
        expect(screen.getByText('Alpha Kitchen').closest('.promoted-wrap')).not.toBeNull();
        expect(screen.getByText('Beta Bites').closest('.promoted-wrap')).toBeNull();
    });

    it('still links each card to its restaurant page', () => {
        render(
            <MemoryRouter>
                <RestaurantList restaurants={restaurants} />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: /Alpha Kitchen/ }).getAttribute('href')).toBe('/restaurants/alpha-kitchen');
        expect(screen.getByRole('link', { name: /Beta Bites/ }).getAttribute('href')).toBe('/restaurants/beta-bites');
    });
});

describe('OrderStatusTimeline', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    const step = (label) => screen.getByText(label).closest('.order-timeline-step');
    const isDone = (label) => step(label).classList.contains('is-done');
    const isCurrent = (label) => step(label).classList.contains('is-current');
    const tick = () => act(() => jest.advanceTimersByTime(3200));

    it('starts at "Order placed" and advances one stage per tick until Delivered', () => {
        render(<OrderStatusTimeline isGrocery={false} />);

        expect(isCurrent('Order placed')).toBe(true);
        expect(isDone('Preparing your food')).toBe(false);

        tick();
        expect(isDone('Order placed')).toBe(true);
        expect(isCurrent('Preparing your food')).toBe(true);

        tick();
        expect(isCurrent('Out for delivery')).toBe(true);

        tick();
        expect(isDone('Delivered')).toBe(true);
        expect(isCurrent('Delivered')).toBe(false);
    });

    it('stops at Delivered instead of running past the end', () => {
        render(<OrderStatusTimeline isGrocery={false} />);
        for (let i = 0; i < 6; i += 1) {
            tick();
        }
        expect(isDone('Delivered')).toBe(true);
        expect(document.querySelectorAll('.is-current')).toHaveLength(0);
    });

    it('uses grocery wording for grocery orders', () => {
        render(<OrderStatusTimeline isGrocery />);
        expect(screen.getByText('Packing your order')).not.toBeNull();
        expect(screen.queryByText('Preparing your food')).toBeNull();
    });
});

describe('Header theme toggle', () => {
    const setSystemDark = (matches) => {
        window.matchMedia = () => ({ matches, addEventListener() {}, removeEventListener() {} });
    };
    const renderHeader = () =>
        render(
            <CartProvider>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </CartProvider>
        );

    beforeEach(() => {
        window.localStorage.clear();
        delete document.documentElement.dataset.theme;
        setSystemDark(false);
    });

    it('switches to dark, persists it, and switches back', () => {
        renderHeader();

        fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
        expect(document.documentElement.dataset.theme).toBe('dark');
        expect(window.localStorage.getItem('quickbite-theme')).toBe('dark');

        fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
        expect(document.documentElement.dataset.theme).toBe('light');
        expect(window.localStorage.getItem('quickbite-theme')).toBe('light');
    });

    it('restores a saved preference on load', () => {
        window.localStorage.setItem('quickbite-theme', 'dark');
        renderHeader();

        expect(document.documentElement.dataset.theme).toBe('dark');
        expect(screen.getByRole('button', { name: 'Switch to light theme' })).not.toBeNull();
    });

    it('follows the OS setting without forcing a theme until the user chooses', () => {
        setSystemDark(true);
        renderHeader();

        expect(screen.getByRole('button', { name: 'Switch to light theme' })).not.toBeNull();
        expect(document.documentElement.dataset.theme).toBeUndefined();
    });
});
