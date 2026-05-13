export type Position = 'GK' | 'DEF' | 'MID' | 'FWD';

export type Player = {
  id: string;
  name: string;
  shortName: string;
  club: string;
  clubToken: string;
  position: Position;
  rating: number;
  price: number;
  form: number[];
  boost: number;
  jerseyNumber: number;
  nationality: string;
  injured?: boolean;
};

export type SquadSlot = {
  slotId: string;
  position: Position;
  playerId: string | null;
};

export type Rival = {
  id: string;
  handle: string;
  avatarHue: number;
  club: string;
  rating: number;
  rank: number;
  wins: number;
  losses: number;
  draws: number;
  recentForm: ('W' | 'L' | 'D')[];
  squadStrength: number;
  stake: number;
  status: 'online' | 'idle' | 'in-match';
  topToken: string;
  bio: string;
};

export type LeaderboardRow = {
  rank: number;
  handle: string;
  club: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  form: ('W' | 'L' | 'D')[];
  isUser?: boolean;
  movement: number;
};

export type PackTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export type Pack = {
  id: string;
  tier: PackTier;
  name: string;
  contents: string;
  acquired: string;
  opened: boolean;
};

export type RewardEntry = {
  id: string;
  date: string;
  type: 'pack' | 'token' | 'badge' | 'xp';
  label: string;
  value: string;
  matchup?: string;
};
