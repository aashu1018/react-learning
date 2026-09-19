import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    addItemToCart,
    cartTotals,
    itemVertical,
    removeItemFromCart,
    updateItemQuantity,
} from '../src/utils/cart.js';

const item = (overrides = {}) => ({ id: 'a', name: 'Dosa', price: 100, quantity: 1, ...overrides });

describe('cartTotals', () => {
    it('is all zeros for an empty cart (no fees on nothing)', () => {
        const totals = cartTotals([]);
        assert.equal(totals.itemCount, 0);
        assert.equal(totals.itemTotal, 0);
        assert.equal(totals.deliveryFee, 0);
        assert.equal(totals.platformFee, 0);
        assert.equal(totals.gst, 0);
        assert.equal(totals.grandTotal, 0);
    });

    it('charges delivery + platform fee + GST below the free-delivery threshold', () => {
        // 100 + 40 delivery + 5 platform = 145 taxable; 5% GST = 7.25 -> 7
        const totals = cartTotals([item({ price: 100 })]);
        assert.equal(totals.deliveryFee, 40);
        assert.equal(totals.platformFee, 5);
        assert.equal(totals.gst, 7);
        assert.equal(totals.grandTotal, 152);
        assert.equal(totals.gstRatePercent, 5);
    });

    it('waives delivery at exactly 199 (threshold is inclusive)', () => {
        // 199 + 0 + 5 = 204 taxable; GST 10.2 -> 10
        const totals = cartTotals([item({ price: 199 })]);
        assert.equal(totals.deliveryFee, 0);
        assert.equal(totals.grandTotal, 214);
    });

    it('still charges delivery at 198', () => {
        assert.equal(cartTotals([item({ price: 198 })]).deliveryFee, 40);
    });

    it('multiplies price by quantity and sums itemCount across lines', () => {
        const totals = cartTotals([item({ price: 100, quantity: 3 }), item({ id: 'b', price: 50, quantity: 2 })]);
        assert.equal(totals.itemCount, 5);
        assert.equal(totals.itemTotal, 400);
        assert.equal(totals.deliveryFee, 0);
    });

    it('keeps totalPrice as an alias of grandTotal', () => {
        const totals = cartTotals([item()]);
        assert.equal(totals.totalPrice, totals.grandTotal);
    });
});

describe('addItemToCart', () => {
    it('adds a new line with quantity 1 and coerces a string price to a number', () => {
        const cart = addItemToCart([], { id: 'x', name: 'Idli', price: '120' });
        assert.equal(cart.length, 1);
        assert.equal(cart[0].quantity, 1);
        assert.equal(cart[0].price, 120);
    });

    it('increments quantity instead of duplicating when the same id is added again', () => {
        const once = addItemToCart([], { id: 'x', name: 'Idli', price: 10 });
        const twice = addItemToCart(once, { id: 'x', name: 'Idli', price: 10 });
        assert.equal(twice.length, 1);
        assert.equal(twice[0].quantity, 2);
    });

    it('defaults vertical to food', () => {
        assert.equal(itemVertical({}), 'food');
        assert.equal(addItemToCart([], { id: 'x', name: 'Idli', price: 10 })[0].vertical, 'food');
    });

    it('replaces the cart when adding an item from a different vertical', () => {
        const food = addItemToCart([], { id: 'f', name: 'Dosa', price: 10 });
        const mixed = addItemToCart(food, { id: 'g', name: 'Milk', price: 30, vertical: 'grocery' });
        assert.equal(mixed.length, 1);
        assert.equal(mixed[0].id, 'g');
    });

    it('does not mutate the input cart', () => {
        const original = [item()];
        addItemToCart(original, { id: 'a', name: 'Dosa', price: 100 });
        assert.equal(original[0].quantity, 1);
    });
});

describe('updateItemQuantity / removeItemFromCart', () => {
    it('sets the quantity of the matching line only', () => {
        const cart = updateItemQuantity([item(), item({ id: 'b' })], 'a', 4);
        assert.equal(cart[0].quantity, 4);
        assert.equal(cart[1].quantity, 1);
    });

    it('removes the line when quantity drops to 0 or below', () => {
        assert.equal(updateItemQuantity([item()], 'a', 0).length, 0);
        assert.equal(updateItemQuantity([item()], 'a', -1).length, 0);
    });

    it('removeItemFromCart drops only the matching id', () => {
        const cart = removeItemFromCart([item(), item({ id: 'b' })], 'a');
        assert.deepEqual(cart.map((entry) => entry.id), ['b']);
    });
});
