import { DELIVERY_AREA } from '../constants/swiggy';

const ADDRESS_KEY = 'quickbite-address';

export const emptyAddress = () => ({
    line: '',
    area: DELIVERY_AREA,
    phone: '',
});

export const readStoredAddress = () => {
    try {
        const parsed = JSON.parse(window.localStorage.getItem(ADDRESS_KEY) || 'null');
        if (!parsed || typeof parsed !== 'object') {
            return emptyAddress();
        }
        return { ...emptyAddress(), ...parsed };
    } catch {
        return emptyAddress();
    }
};

export const saveStoredAddress = (address) => {
    window.localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
};

export const formatDeliveryEta = (minutes) => {
    const arrive = new Date(Date.now() + minutes * 60 * 1000);
    return arrive.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};
