export interface Iactivities {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  distance: string;
  rating: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
  photos: string[];
  available: boolean;
}
