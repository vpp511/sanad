export interface InstalledApp {
  id: string;
  name: string;
  category: string;
  iconName: string;
  isBlocked: boolean;
  timeUsedMinutes: number;
}

export interface ChildDevice {
  id: string;
  name: string;
  model: string;
  childName: string;
  childAge: number;
  childAvatar: string;
  batteryLevel: number;
  isCharging: boolean;
  status: 'online' | 'locked' | 'bedtime' | 'offline';
  screenTimeUsedMinutes: number;
  screenTimeLimitMinutes: number;
  currentApp?: string;
  locationName: string;
  lastActive: string;
  bedtimeStart: string;
  bedtimeEnd: string;
  isInstantPaused: boolean;
  webFilterActive: boolean;
  installedApps: InstalledApp[];
}

export interface PairingSession {
  pairingCode: string;
  pinCode: string;
  expiresInSeconds: number;
  status: 'waiting' | 'scanning' | 'paired' | 'expired';
  targetDeviceName?: string;
  targetChildName?: string;
}

export type ActiveTab = 'pairing' | 'dashboard' | 'device-detail';
