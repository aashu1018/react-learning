export const fetchJson = async (url) => {
    try {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !contentType.includes('json')) {
            return null;
        }
        return response.json();
    } catch {
        return null;
    }
};
