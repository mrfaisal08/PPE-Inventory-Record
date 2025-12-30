
export enum PPECategory {
  HEAD = 'Head Protection',
  EYE_FACE = 'Eye & Face Protection',
  HEARING = 'Hearing Protection',
  RESPIRATORY = 'Respiratory Protection',
  HAND = 'Hand Protection',
  BODY = 'Body Protection',
  FOOT = 'Foot Protection',
  FALL = 'Fall Protection'
}

export interface PPEItem {
  id: string;
  category: PPECategory;
  name: string;
  sizes: string[];
  colors?: string[];
}

export interface IPPERecord {
  id: string;
  vesselName: string;
  requestorName: string;
  date: string;
  categoryId: PPECategory;
  itemName: string;
  size: string;
  color: string;
  quantity: number;
  isVerified: boolean;
  timestamp: number;
}

export interface DashboardStats {
  totalItemsTaken: number;
  topRequestor: string;
  activeVessels: number;
  categoryDistribution: Record<string, number>;
}
