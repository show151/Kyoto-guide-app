export interface Spot {
    id: string;
    name: string;
    lat: number;
    lng: number;
    category: string[];
    description: string;
    images: string[];
    thumbnailImg?: string;
    address?: string;
    entranceFee?: string;
    url?: string;
}

interface BackendSpot {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    description: string;
    address: string;
    category: string[];
    images: string[];
    "thumbnail-img"?: string;
    "entrance_fee"?: string;
    references?: {
        title: string;
        url: string;
        author: string;
        year: string;
        note: string;
    }[];
}

import fallbackData from './data/spots.json';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const api = {
    getSpots: async (): Promise<Spot[]> => {
        try {
            const response = await fetch(`${BASE_URL}/spots`);
            if (!response.ok) {
                throw new Error('Failed to fetch spots');
            }
            const data: BackendSpot[] = await response.json();
            return mapBackendSpots(data);
        } catch (error) {
            console.warn('API fetch failed, using fallback data', error);
            // fallbackData might be typed as any or specific shape, cast carefully
            return mapBackendSpots(fallbackData as unknown as BackendSpot[]);
        }
    },

    getSpotById: async (id: string): Promise<Spot> => {
        // Since we are simulating IDs with index in list, this might need adjustment if backend doesn't support getById with index.
        // For now, let's fetch all and find by index to stay consistent without backend ID.
        // Ideally backend should support /spots/:id

        try {
            const response = await fetch(`${BASE_URL}/spots`);
            if (!response.ok) {
                throw new Error('Failed to fetch spot');
            }
            const data: BackendSpot[] = await response.json();
            return findSpotByIndex(data, id);
        } catch (error) {
            console.warn('API fetch failed for detail, using fallback data', error);
            return findSpotByIndex(fallbackData as unknown as BackendSpot[], id);
        }
    }
};

const mapBackendSpots = (data: BackendSpot[]): Spot[] => {
    return data.map((item, index) => {
        // Parse the URL from the weird format "[url1, url2]" or similar
        let url = "";
        if (item.references && item.references.length > 0 && item.references[0].url) {
            const rawUrl = item.references[0].url;
            // Remove enclosing brackets if present
            const cleaned = rawUrl.replace(/^\[|\]$/g, '');
            // Split by comma and take the first one
            const urls = cleaned.split(',');
            if (urls.length > 0) {
                url = urls[0].trim();
            }
        }

        return {
            id: index.toString(),
            name: item.name,
            lat: item.location.latitude,
            lng: item.location.longitude,
            category: item.category,
            description: item.description,
            images: item.images,
            thumbnailImg: item["thumbnail-img"],
            address: item.address,
            entranceFee: item["entrance_fee"],
            url: url
        };
    });
};

const findSpotByIndex = (data: BackendSpot[], id: string): Spot => {
    const index = parseInt(id);
    const item = data[index];

    if (!item) {
        throw new Error('Spot not found');
    }

    return {
        id: id,
        name: item.name,
        lat: item.location.latitude,
        lng: item.location.longitude,
        category: item.category,
        description: item.description,
        images: item.images,
        thumbnailImg: item["thumbnail-img"],
        address: item.address,
        entranceFee: item["entrance_fee"],
        url: item.references?.[0]?.url?.replace(/^\[|\]$/g, '').split(',')[0].trim()
    };
};
