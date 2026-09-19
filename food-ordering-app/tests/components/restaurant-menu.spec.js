import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CartProvider from '../../src/components/CartProvider.js';
import RestaurantMenu from '../../src/components/RestaurantMenu.js';
import mockRestaurants from '../../src/assets/MockData.js';

// jsdom has no fetch, so the hook's live call fails quietly and the page
// falls back to the bundled mock menu: Bestsellers (2), Recommended (3), More from the kitchen (3).
const meghana = mockRestaurants[0];

const renderMenu = () =>
    render(
        <CartProvider>
            <MemoryRouter initialEntries={[{ pathname: '/restaurants/meghana-foods', state: { restaurant: meghana } }]}>
                <Routes>
                    <Route path="/restaurants/:resName" element={<RestaurantMenu />} />
                </Routes>
            </MemoryRouter>
        </CartProvider>
    );

const header = (name) => screen.getByRole('button', { name });

// The first category opens in an effect right after load, so wait for that settled state.
const renderReadyMenu = async () => {
    renderMenu();
    await screen.findByRole('button', { name: 'Bestsellers (2)', expanded: true });
};

beforeEach(() => window.localStorage.clear());

describe('restaurant menu accordion', () => {
    it('loads the menu and opens only the first category', async () => {
        await renderReadyMenu();

        expect(header('Bestsellers (2)').getAttribute('aria-expanded')).toBe('true');
        expect(header('Recommended (3)').getAttribute('aria-expanded')).toBe('false');
        expect(header('More from the kitchen (3)').getAttribute('aria-expanded')).toBe('false');

        expect(screen.getByText('Chicken Special')).not.toBeNull();
        expect(screen.queryByText('Butter Naan')).toBeNull();
    });

    it('opening a category closes the one that was open', async () => {
        await renderReadyMenu();

        fireEvent.click(header('Recommended (3)'));

        expect(header('Recommended (3)').getAttribute('aria-expanded')).toBe('true');
        expect(header('Bestsellers (2)').getAttribute('aria-expanded')).toBe('false');
        expect(screen.getByText('Butter Naan')).not.toBeNull();
        expect(screen.queryByText('Chicken Special')).toBeNull();
    });

    it('lets the open category collapse so nothing is expanded', async () => {
        await renderReadyMenu();

        fireEvent.click(header('Bestsellers (2)'));

        screen.getAllByRole('button', { name: /\(\d+\)$/ }).forEach((button) => {
            expect(button.getAttribute('aria-expanded')).toBe('false');
        });
        expect(screen.queryByRole('list')).toBeNull();
    });

    it('opens a category from the pill rail too', async () => {
        await renderReadyMenu();
        // jsdom doesn't implement scrolling
        Element.prototype.scrollIntoView = () => {};

        const rail = screen.getByRole('navigation', { name: 'Menu categories' });
        fireEvent.click(within(rail).getByRole('button', { name: 'More from the kitchen' }));

        expect(header('More from the kitchen (3)').getAttribute('aria-expanded')).toBe('true');
        expect(screen.getByText('Soft Drink')).not.toBeNull();
    });

    it('adds a dish to the cart from an open category', async () => {
        await renderReadyMenu();

        const dish = screen.getByText('Chicken Special').closest('li');
        fireEvent.click(within(dish).getByRole('button', { name: 'Add' }));

        expect(within(dish).getByRole('button', { name: 'Increase Chicken Special' })).not.toBeNull();
    });
});
