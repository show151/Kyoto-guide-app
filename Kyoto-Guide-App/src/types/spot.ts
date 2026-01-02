// src/types/spot.ts
export type Spot = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  address: string;
  category: string[];
  tags: string[];
  radius: number;
  openingHours?: string;
  entranceFee?: string;
  images?: string[];
};
