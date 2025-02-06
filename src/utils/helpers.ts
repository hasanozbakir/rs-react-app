export const extractIdFromUrl = (url: string): string | null => {
    const matches = url.match(/\/(\d+)\/$/); 
    return matches ? matches[1] : null;
};