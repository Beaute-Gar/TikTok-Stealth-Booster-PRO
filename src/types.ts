export type PlatformType = 'tiktok' | 'youtube' | 'instagram';

export interface BaseAccount {
  username: string;
  avatar?: string;
  followers: number;
  following: number;
  likes: number;
  bio?: string;
  platform: PlatformType;
  isConnected: boolean;
}

export interface TikTokAccount extends BaseAccount {
  platform: 'tiktok';
  videos: VideoData[];
  monetizationStatus: MonetizationStatus;
}

export interface YouTubeAccount extends BaseAccount {
  platform: 'youtube';
  subscribers: number;
  totalViews: number;
  monetizationEnabled: boolean;
}

export interface InstagramAccount extends BaseAccount {
  platform: 'instagram';
  postsCount: number;
}

export interface VideoData {
  id: string;
  description: string;
  views: number;
  likes: number;
  thumbnail: string;
}

export interface MonetizationStatus {
  isEligibleForLive: boolean;
  isEligibleForCreatorFund: boolean;
  estimatedEarnings: number;
  subscriptionPrice: number;
  commissionDue: number;
}

export interface CommissionRecord {
  id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
  platform: PlatformType;
}

export type Country = 'Cameroon' | 'Ivory Coast' | 'Senegal' | 'France' | 'Other';

export interface AppState {
  isOnboarded: boolean;
  acceptedTerms: boolean;
  country: Country;
  trialExpiresAt?: number;
  currentAccount?: TikTokAccount;
  accounts: {
    tiktok?: TikTokAccount;
    youtube?: YouTubeAccount;
    instagram?: InstagramAccount;
  };
  commissions: CommissionRecord[];
  currentTab: string;
}
