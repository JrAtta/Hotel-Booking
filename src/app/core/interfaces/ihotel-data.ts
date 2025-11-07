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
  roomFeature: IRoomFeature;
}

export interface IRoomFeature {
  bedroom: number;
  livingRoom: number;
  diningroom: number;
  bathroom: number;
  unitReady: number;
  internetDownload: number;
  television: number;
  refrigerator: number;
}
