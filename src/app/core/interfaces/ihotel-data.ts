export interface IhotelData {
  id: string;
  name: string;
  location: string;
  description: string;
  imageCover: string;
  images: string[];
  costPerDay: number;
  currency: string;
  rating: number;
  isPopularChoice: boolean;
  roomFeature: RoomFeature;
}

interface RoomFeature {
  bedroom: number;
  livingRoom: number;
  diningroom: number;
  bathroom: number;
  unitReady: number;
  internetDownload: number;
  television: boolean;
  refrigerator: boolean;
}
