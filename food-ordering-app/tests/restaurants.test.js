import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    filterByCuisine,
    filterBySearch,
    filterFastDelivery,
    filterTopRated,
    popularCuisines,
} from '../src/utils/restaurantFilters.js';
import { findRestaurantBySlug, restaurantSlug } from '../src/utils/restaurantSlug.js';
import { formatCostForTwo } from '../src/utils/formatters.js';
import { mapApiRestaurant, pickRestaurantsFromListPayload } from '../src/utils/restaurantMapper.js';

const place = (overrides = {}) => ({
    id: 1,
    name: 'Meghana Foods',
    cuisines: ['Biryani', 'North Indian'],
    dishes: ['Butter Naan'],
    rating: 4.4,
    deliveryTime: 30,
    ...overrides,
});

describe('restaurantSlug', () => {
    it('lowercases, drops apostrophes, and collapses punctuation to single dashes', () => {
        assert.equal(restaurantSlug("Domino's Pizza"), 'dominos-pizza');
        assert.equal(restaurantSlug('The Belgian Waffle Co.'), 'the-belgian-waffle-co');
        assert.equal(restaurantSlug('Wow! Momo'), 'wow-momo');
    });

    it('strips accents and tolerates empty input', () => {
        assert.equal(restaurantSlug('Café Coffee'), 'cafe-coffee');
        assert.equal(restaurantSlug(undefined), '');
    });

    it('findRestaurantBySlug round-trips a name', () => {
        const list = [place({ name: "McDonald's" }), place({ id: 2, name: 'KFC' })];
        assert.equal(findRestaurantBySlug(list, 'mcdonalds').name, "McDonald's");
        assert.equal(findRestaurantBySlug(list, 'nope'), undefined);
    });
});

describe('restaurant filters', () => {
    it('filterBySearch matches name, cuisine, or dish, case-insensitively; blank returns all', () => {
        const list = [place(), place({ id: 2, name: 'KFC', cuisines: ['Burgers'], dishes: ['Zinger'] })];
        assert.equal(filterBySearch(list, 'MEGHANA').length, 1);
        assert.equal(filterBySearch(list, 'burger').length, 1);
        assert.equal(filterBySearch(list, 'zinger')[0].name, 'KFC');
        assert.equal(filterBySearch(list, '   ').length, 2);
    });

    it('filterTopRated is inclusive at 4.3 and coerces string ratings', () => {
        const list = [place({ rating: 4.3 }), place({ id: 2, rating: '4.2' }), place({ id: 3, rating: '4.8' })];
        assert.deepEqual(filterTopRated(list).map((entry) => entry.id), [1, 3]);
    });

    it('filterFastDelivery is inclusive at 25 minutes', () => {
        const list = [place({ deliveryTime: 25 }), place({ id: 2, deliveryTime: 26 })];
        assert.deepEqual(filterFastDelivery(list).map((entry) => entry.id), [1]);
    });

    it('filterByCuisine matches exactly but ignores case', () => {
        const list = [place(), place({ id: 2, cuisines: ['Burgers'] })];
        assert.deepEqual(filterByCuisine(list, 'biryani').map((entry) => entry.id), [1]);
        assert.equal(filterByCuisine(list, '').length, 2);
    });

    it('popularCuisines ranks by count, breaks ties alphabetically, skips blanks, honours limit', () => {
        const list = [
            place({ cuisines: ['Pizza', 'Burgers', ''] }),
            place({ id: 2, cuisines: ['Pizza', 'Biryani'] }),
            place({ id: 3, cuisines: ['Burgers'] }),
        ];
        assert.deepEqual(popularCuisines(list), ['Burgers', 'Pizza', 'Biryani']);
        assert.deepEqual(popularCuisines(list, 1), ['Burgers']);
    });
});

describe('formatCostForTwo', () => {
    it('formats plain numbers and passes strings through', () => {
        assert.equal(formatCostForTwo(400), '₹400 for two');
        assert.equal(formatCostForTwo('₹350 for two'), '₹350 for two');
    });

    it('prefers costForTwoMessage and treats large numbers as paise', () => {
        assert.equal(formatCostForTwo({ costForTwoMessage: '₹500 for two', costForTwo: 1 }), '₹500 for two');
        assert.equal(formatCostForTwo({ costForTwo: 40000 }), '₹400 for two');
    });

    it('returns an empty string for null / undefined', () => {
        assert.equal(formatCostForTwo(null), '');
        assert.equal(formatCostForTwo(undefined), '');
    });
});

describe('mapApiRestaurant', () => {
    const api = (info) => ({ info: { id: '9', name: 'Test Kitchen', ...info } });

    it('flags a restaurant promoted when Swiggy says so, whatever its rating', () => {
        assert.equal(mapApiRestaurant(api({ promoted: true, avgRating: 3.0 })).promoted, true);
    });

    it('falls back to a 4.5 rating bar (inclusive) when no promoted flag is present', () => {
        assert.equal(mapApiRestaurant(api({ avgRating: 4.5 })).promoted, true);
        assert.equal(mapApiRestaurant(api({ avgRating: 4.4 })).promoted, false);
    });

    it('handles string ratings and a missing rating', () => {
        assert.equal(mapApiRestaurant(api({ avgRatingString: '4.6' })).promoted, true);
        assert.equal(mapApiRestaurant(api({})).promoted, false);
    });

    it('accepts both { info } wrappers and flat objects, and builds the image URL', () => {
        const flat = mapApiRestaurant({ id: '1', name: 'Flat', cloudinaryImageId: 'abc123' });
        assert.equal(flat.name, 'Flat');
        assert.ok(flat.image.endsWith('abc123'));
        assert.equal(mapApiRestaurant(api({})).image, undefined);
    });
});

describe('pickRestaurantsFromListPayload', () => {
    const gridCard = (restaurants) => ({ card: { card: { gridElements: { infoWithStyle: { restaurants } } } } });

    it('collects restaurants across cards and dedupes by id', () => {
        const json = {
            data: {
                cards: [
                    { card: { card: { title: 'no restaurants here' } } },
                    gridCard([{ info: { id: 1, name: 'A' } }, { info: { id: 2, name: 'B' } }]),
                    gridCard([{ info: { id: 2, name: 'B again' } }, { info: { id: 3, name: 'C' } }]),
                ],
            },
        };
        const names = pickRestaurantsFromListPayload(json).map((entry) => entry.info.name);
        assert.deepEqual(names, ['A', 'B', 'C']);
    });

    it('returns an empty array for an empty payload', () => {
        assert.deepEqual(pickRestaurantsFromListPayload({}), []);
    });
});
