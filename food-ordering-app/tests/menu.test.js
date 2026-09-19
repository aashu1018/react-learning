import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    filterMenuSections,
    splitRecommendedSections,
    withBestsellersSection,
} from '../src/utils/menuFilters.js';
import { parseMenuPayload } from '../src/utils/menuMapper.js';

const dish = (id, overrides = {}) => ({ id, name: `Dish ${id}`, isVeg: true, isBestseller: false, ...overrides });

describe('withBestsellersSection', () => {
    it('prepends a synthesized Bestsellers section when 2+ bestsellers exist', () => {
        const sections = [
            { title: 'Mains', items: [dish(1, { isBestseller: true }), dish(2)] },
            { title: 'Sides', items: [dish(3, { isBestseller: true })] },
        ];
        const result = withBestsellersSection(sections);
        assert.equal(result[0].title, 'Bestsellers');
        assert.deepEqual(result[0].items.map((entry) => entry.id), [1, 3]);
        assert.equal(result.length, 3);
    });

    it('dedupes a bestseller that appears in more than one section', () => {
        const sections = [
            { title: 'Recommended', items: [dish(1, { isBestseller: true })] },
            { title: 'Mains', items: [dish(1, { isBestseller: true }), dish(2, { isBestseller: true })] },
        ];
        assert.deepEqual(withBestsellersSection(sections)[0].items.map((entry) => entry.id), [1, 2]);
    });

    it('leaves sections untouched with fewer than 2 bestsellers', () => {
        const sections = [{ title: 'Mains', items: [dish(1, { isBestseller: true }), dish(2)] }];
        assert.equal(withBestsellersSection(sections), sections);
    });
});

describe('splitRecommendedSections', () => {
    it('separates any section whose title contains "recommend" (case-insensitive)', () => {
        const { recommended, otherSections } = splitRecommendedSections([
            { title: 'Recommended For You', items: [] },
            { title: 'Mains', items: [] },
            { title: 'RECOMMENDED', items: [] },
        ]);
        assert.equal(recommended.length, 2);
        assert.deepEqual(otherSections.map((entry) => entry.title), ['Mains']);
    });
});

describe('filterMenuSections', () => {
    const sections = [
        { title: 'Mains', items: [dish(1, { name: 'Paneer Tikka' }), dish(2, { name: 'Chicken Tikka', isVeg: false })] },
        { title: 'Drinks', items: [dish(3, { name: 'Lassi' })] },
    ];

    it('vegOnly removes non-veg items', () => {
        const result = filterMenuSections(sections, { vegOnly: true });
        assert.deepEqual(result[0].items.map((entry) => entry.id), [1]);
    });

    it('search is case-insensitive, trims, and matches descriptions too', () => {
        const withDesc = [{ title: 'Mains', items: [dish(1, { name: 'Bowl', description: 'Spicy Gunpowder rice' })] }];
        assert.equal(filterMenuSections(withDesc, { query: '  GUNPOWDER ' })[0].items.length, 1);
    });

    it('drops sections left empty by the filter', () => {
        const result = filterMenuSections(sections, { query: 'lassi' });
        assert.deepEqual(result.map((entry) => entry.title), ['Drinks']);
    });

    it('floats bestsellers to the top within a section', () => {
        const result = filterMenuSections([
            { title: 'Mains', items: [dish(1), dish(2, { isBestseller: true })] },
        ]);
        assert.deepEqual(result[0].items.map((entry) => entry.id), [2, 1]);
    });
});

describe('parseMenuPayload', () => {
    const payload = {
        data: {
            cards: [
                { card: { card: { info: { id: '1', name: 'Test Place' } } } },
                {
                    groupedCard: {
                        cardGroupMap: {
                            REGULAR: {
                                cards: [
                                    {
                                        card: {
                                            card: {
                                                title: 'Recommended',
                                                itemCards: [
                                                    { card: { info: { id: 'a', name: 'Dosa', price: 12000, isVeg: 1, isBestseller: true } } },
                                                    { card: { info: { id: 'b', name: 'Chicken', defaultPrice: 25000, itemAttribute: { vegClassifier: 'NONVEG' } } } },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        card: {
                                            card: {
                                                title: 'Drinks',
                                                categories: [
                                                    { itemCards: [{ card: { info: { id: 'c', name: 'Lassi', price: 8000, itemAttribute: { vegClassifier: 'VEG' } } } }] },
                                                ],
                                            },
                                        },
                                    },
                                    { card: { card: { title: 'Empty', itemCards: [] } } },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    };

    it('reads restaurant info and converts paise prices to rupees', () => {
        const { info, sections } = parseMenuPayload(payload);
        assert.equal(info.name, 'Test Place');
        assert.equal(sections[0].items[0].price, 120);
        assert.equal(sections[0].items[1].price, 250);
    });

    it('derives veg / bestseller flags from the various Swiggy fields', () => {
        const [recommended] = parseMenuPayload(payload).sections;
        assert.equal(recommended.items[0].isVeg, true);
        assert.equal(recommended.items[0].isBestseller, true);
        assert.equal(recommended.items[1].isVeg, false);
        assert.equal(recommended.items[1].isBestseller, false);
    });

    it('flattens nested categories and drops empty sections', () => {
        const { sections } = parseMenuPayload(payload);
        assert.deepEqual(sections.map((entry) => entry.title), ['Recommended', 'Drinks']);
        assert.equal(sections[1].items[0].name, 'Lassi');
    });

    it('returns null when the payload has neither info nor sections', () => {
        assert.equal(parseMenuPayload({}), null);
    });
});
