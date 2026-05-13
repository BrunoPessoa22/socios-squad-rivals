import type {
  LeaderboardRow,
  Pack,
  Player,
  RewardEntry,
  Rival,
} from './types';

export const fanTokens = [
  { symbol: '$PSG', club: 'Paris Saint-Germain', balance: 142, boost: 1.25 },
  { symbol: '$BAR', club: 'FC Barcelona', balance: 88, boost: 1.18 },
  { symbol: '$JUV', club: 'Juventus', balance: 36, boost: 1.1 },
  { symbol: '$CITY', club: 'Manchester City', balance: 12, boost: 1.05 },
];

export const players: Player[] = [
  { id: 'p1', name: 'Gianluigi Donnarumma', shortName: 'G. Donnarumma', club: 'PSG', clubToken: '$PSG', position: 'GK', rating: 88, price: 7.2, form: [7, 6, 8, 5, 7], boost: 1.25, jerseyNumber: 99, nationality: 'IT' },
  { id: 'p2', name: 'Marc-André ter Stegen', shortName: 'Ter Stegen', club: 'BAR', clubToken: '$BAR', position: 'GK', rating: 87, price: 7.0, form: [6, 7, 7, 4, 8], boost: 1.18, jerseyNumber: 1, nationality: 'DE' },
  { id: 'p3', name: 'Achraf Hakimi', shortName: 'Hakimi', club: 'PSG', clubToken: '$PSG', position: 'DEF', rating: 86, price: 7.8, form: [8, 7, 6, 9, 7], boost: 1.25, jerseyNumber: 2, nationality: 'MA' },
  { id: 'p4', name: 'Pau Cubarsí', shortName: 'Cubarsí', club: 'BAR', clubToken: '$BAR', position: 'DEF', rating: 84, price: 6.4, form: [7, 8, 7, 7, 8], boost: 1.18, jerseyNumber: 5, nationality: 'ES' },
  { id: 'p5', name: 'Federico Gatti', shortName: 'Gatti', club: 'JUV', clubToken: '$JUV', position: 'DEF', rating: 82, price: 5.6, form: [7, 6, 7, 6, 8], boost: 1.1, jerseyNumber: 15, nationality: 'IT' },
  { id: 'p6', name: 'Rúben Dias', shortName: 'R. Dias', club: 'CITY', clubToken: '$CITY', position: 'DEF', rating: 87, price: 7.4, form: [8, 7, 8, 7, 6], boost: 1.05, jerseyNumber: 3, nationality: 'PT' },
  { id: 'p7', name: 'Vitinha', shortName: 'Vitinha', club: 'PSG', clubToken: '$PSG', position: 'MID', rating: 88, price: 8.9, form: [9, 8, 7, 8, 9], boost: 1.25, jerseyNumber: 17, nationality: 'PT' },
  { id: 'p8', name: 'Pedri', shortName: 'Pedri', club: 'BAR', clubToken: '$BAR', position: 'MID', rating: 87, price: 8.5, form: [8, 9, 7, 8, 8], boost: 1.18, jerseyNumber: 8, nationality: 'ES' },
  { id: 'p9', name: 'Kenan Yıldız', shortName: 'Yıldız', club: 'JUV', clubToken: '$JUV', position: 'MID', rating: 84, price: 7.2, form: [7, 8, 6, 8, 9], boost: 1.1, jerseyNumber: 10, nationality: 'TR' },
  { id: 'p10', name: 'Phil Foden', shortName: 'Foden', club: 'CITY', clubToken: '$CITY', position: 'MID', rating: 88, price: 9.1, form: [8, 8, 9, 7, 8], boost: 1.05, jerseyNumber: 47, nationality: 'EN' },
  { id: 'p11', name: 'Ousmane Dembélé', shortName: 'Dembélé', club: 'PSG', clubToken: '$PSG', position: 'FWD', rating: 87, price: 9.4, form: [8, 9, 7, 9, 8], boost: 1.25, jerseyNumber: 10, nationality: 'FR' },
  { id: 'p12', name: 'Lamine Yamal', shortName: 'Yamal', club: 'BAR', clubToken: '$BAR', position: 'FWD', rating: 89, price: 10.2, form: [9, 9, 8, 9, 9], boost: 1.18, jerseyNumber: 19, nationality: 'ES' },
  { id: 'p13', name: 'Dušan Vlahović', shortName: 'Vlahović', club: 'JUV', clubToken: '$JUV', position: 'FWD', rating: 84, price: 7.8, form: [6, 7, 8, 6, 7], boost: 1.1, jerseyNumber: 9, nationality: 'RS' },
  { id: 'p14', name: 'Erling Haaland', shortName: 'Haaland', club: 'CITY', clubToken: '$CITY', position: 'FWD', rating: 91, price: 11.4, form: [9, 8, 10, 8, 9], boost: 1.05, jerseyNumber: 9, nationality: 'NO' },
  { id: 'p15', name: 'Raphinha', shortName: 'Raphinha', club: 'BAR', clubToken: '$BAR', position: 'FWD', rating: 85, price: 8.6, form: [7, 8, 7, 9, 7], boost: 1.18, jerseyNumber: 11, nationality: 'BR', injured: true },
];

export const suggestedSquad: Record<string, string> = {
  GK: 'p1',
  'DEF-1': 'p3',
  MID: 'p7',
  'FWD-1': 'p11',
  'FWD-2': 'p12',
};

export const rivals: Rival[] = [
  { id: 'r1', handle: 'sgt_offside', avatarHue: 12, club: 'PSG', rating: 1842, rank: 4, wins: 18, losses: 7, draws: 3, recentForm: ['W', 'W', 'L', 'W', 'D'], squadStrength: 87, stake: 50, status: 'online', topToken: '$PSG', bio: 'Treble or nothing.' },
  { id: 'r2', handle: 'culerCore10', avatarHue: 220, club: 'BAR', rating: 1798, rank: 7, wins: 16, losses: 9, draws: 2, recentForm: ['W', 'L', 'W', 'W', 'W'], squadStrength: 85, stake: 35, status: 'online', topToken: '$BAR', bio: 'Possession is 9/10ths of the law.' },
  { id: 'r3', handle: 'bianconero88', avatarHue: 0, club: 'JUV', rating: 1721, rank: 12, wins: 14, losses: 11, draws: 4, recentForm: ['D', 'W', 'L', 'D', 'W'], squadStrength: 81, stake: 25, status: 'idle', topToken: '$JUV', bio: 'Park the bus. Score on the break.' },
  { id: 'r4', handle: 'cityzen.eth', avatarHue: 195, club: 'CITY', rating: 1903, rank: 2, wins: 22, losses: 4, draws: 2, recentForm: ['W', 'W', 'W', 'W', 'D'], squadStrength: 91, stake: 80, status: 'in-match', topToken: '$CITY', bio: 'Pep cult member since 2008.' },
  { id: 'r5', handle: 'tifosi_curva', avatarHue: 50, club: 'JUV', rating: 1654, rank: 18, wins: 12, losses: 13, draws: 3, recentForm: ['L', 'W', 'D', 'L', 'W'], squadStrength: 78, stake: 15, status: 'online', topToken: '$JUV', bio: 'Curva Sud forever.' },
  { id: 'r6', handle: 'rouge_et_bleu', avatarHue: 340, club: 'PSG', rating: 1812, rank: 6, wins: 17, losses: 8, draws: 3, recentForm: ['W', 'W', 'W', 'L', 'W'], squadStrength: 86, stake: 45, status: 'online', topToken: '$PSG', bio: 'Ici c’est Paris.' },
];

export const leaderboard: LeaderboardRow[] = [
  { rank: 1, handle: 'godmode_xi', club: 'CITY', played: 28, won: 24, drawn: 3, lost: 1, points: 75, form: ['W','W','W','W','W'], movement: 0 },
  { rank: 2, handle: 'cityzen.eth', club: 'CITY', played: 28, won: 22, drawn: 2, lost: 4, points: 68, form: ['W','W','W','W','D'], movement: 1 },
  { rank: 3, handle: 'totale_zero5', club: 'JUV', played: 28, won: 20, drawn: 4, lost: 4, points: 64, form: ['W','D','W','W','W'], movement: -1 },
  { rank: 4, handle: 'sgt_offside', club: 'PSG', played: 28, won: 18, drawn: 3, lost: 7, points: 57, form: ['W','W','L','W','D'], movement: 2 },
  { rank: 5, handle: 'bruno.eth', club: 'PSG', played: 28, won: 17, drawn: 4, lost: 7, points: 55, form: ['W','D','W','L','W'], movement: 3, isUser: true },
  { rank: 6, handle: 'rouge_et_bleu', club: 'PSG', played: 28, won: 17, drawn: 3, lost: 8, points: 54, form: ['W','W','W','L','W'], movement: -1 },
  { rank: 7, handle: 'culerCore10', club: 'BAR', played: 27, won: 16, drawn: 2, lost: 9, points: 50, form: ['W','L','W','W','W'], movement: 0 },
  { rank: 8, handle: 'azulgrana_now', club: 'BAR', played: 28, won: 15, drawn: 3, lost: 10, points: 48, form: ['L','W','D','W','L'], movement: -2 },
  { rank: 9, handle: 'parisien_77', club: 'PSG', played: 28, won: 14, drawn: 4, lost: 10, points: 46, form: ['D','L','W','W','D'], movement: 1 },
  { rank: 10, handle: 'gunner_north', club: 'CITY', played: 28, won: 13, drawn: 5, lost: 10, points: 44, form: ['L','D','W','D','W'], movement: 0 },
  { rank: 11, handle: 'milan_ultra', club: 'JUV', played: 28, won: 12, drawn: 5, lost: 11, points: 41, form: ['L','W','L','D','W'], movement: -1 },
  { rank: 12, handle: 'bianconero88', club: 'JUV', played: 28, won: 14, drawn: 4, lost: 10, points: 46, form: ['D','W','L','D','W'], movement: 2 },
  { rank: 13, handle: 'fondo_sud', club: 'JUV', played: 27, won: 11, drawn: 4, lost: 12, points: 37, form: ['L','W','L','L','D'], movement: 1 },
  { rank: 14, handle: 'kingsmen_blues', club: 'CITY', played: 28, won: 10, drawn: 5, lost: 13, points: 35, form: ['L','L','W','D','L'], movement: -2 },
  { rank: 15, handle: 'maillot_neuf', club: 'PSG', played: 28, won: 9, drawn: 4, lost: 15, points: 31, form: ['L','L','L','W','L'], movement: -3 },
];

export const userProfile = {
  handle: 'bruno.eth',
  displayName: 'Bruno P.',
  club: 'PSG',
  clubToken: '$PSG',
  joined: 'Apr 2026',
  tier: 'gold' as const,
  xp: 6320,
  nextTierXp: 8000,
  matches: { played: 28, won: 17, drawn: 4, lost: 7 },
  totalPoints: 2418,
  longestStreak: 6,
  trophies: [
    { id: 't1', name: 'Matchday MVP', issued: 'Apr 12' },
    { id: 't2', name: 'Promotion: D3 → D2', issued: 'Mar 30' },
    { id: 't3', name: '10-Win Streak', issued: 'Feb 18' },
  ],
  recentMatches: [
    { id: 'm1', opponent: 'sgt_offside', result: 'W', score: '74–62', date: 'May 11' },
    { id: 'm2', opponent: 'culerCore10', result: 'D', score: '58–58', date: 'May 09' },
    { id: 'm3', opponent: 'cityzen.eth', result: 'W', score: '81–77', date: 'May 06' },
    { id: 'm4', opponent: 'tifosi_curva', result: 'L', score: '49–66', date: 'May 03' },
    { id: 'm5', opponent: 'rouge_et_bleu', result: 'W', score: '72–55', date: 'May 01' },
  ],
};

export const packs: Pack[] = [
  { id: 'pk1', tier: 'gold', name: 'Champion’s Pack', contents: '1 Gold player · 2 Silver · 1 Boost', acquired: 'May 12', opened: false },
  { id: 'pk2', tier: 'silver', name: 'Matchday Crate', contents: '1 Silver · 3 Bronze', acquired: 'May 09', opened: false },
  { id: 'pk3', tier: 'bronze', name: 'Daily Reward', contents: '3 Bronze', acquired: 'May 13', opened: false },
  { id: 'pk4', tier: 'platinum', name: 'Promotion Reward', contents: '1 Platinum · 2 Gold · Token boost +0.15', acquired: 'Mar 30', opened: true },
];

export const rewardHistory: RewardEntry[] = [
  { id: 'rh1', date: 'May 11', type: 'pack', label: 'Champion’s Pack', value: '+1 Gold pack', matchup: 'vs sgt_offside' },
  { id: 'rh2', date: 'May 09', type: 'xp', label: 'XP Bonus', value: '+85 XP', matchup: 'vs culerCore10' },
  { id: 'rh3', date: 'May 06', type: 'token', label: 'Token reward', value: '+2.4 $PSG', matchup: 'vs cityzen.eth' },
  { id: 'rh4', date: 'May 01', type: 'badge', label: '5-game streak', value: 'Hot Streak badge' },
  { id: 'rh5', date: 'Apr 28', type: 'pack', label: 'Matchday Crate', value: '+1 Silver pack' },
];

export const tierLadder: { tier: Pack['tier']; min: number; max: number; perks: string[] }[] = [
  { tier: 'bronze', min: 0, max: 1500, perks: ['Daily pack', 'Basic squad slots'] },
  { tier: 'silver', min: 1500, max: 3500, perks: ['Weekly silver pack', '+0.05 token boost'] },
  { tier: 'gold', min: 3500, max: 8000, perks: ['Captain re-pick', '+0.10 token boost', 'Gold pack monthly'] },
  { tier: 'platinum', min: 8000, max: 16000, perks: ['Scouting reports', '+0.15 token boost', 'Platinum pack monthly'] },
  { tier: 'diamond', min: 16000, max: 32000, perks: ['All perks', '+0.20 token boost', 'Diamond pack monthly', 'Pro lobby'] },
];

export const upcomingMatchup = {
  opponent: rivals[0],
  kickoff: 'Saturday · 18:00',
  pot: 100,
  stakeToken: '$PSG',
  prediction: { you: 62, them: 58, edge: 4 },
};

export const settlement = {
  opponent: rivals[1],
  score: { you: 74, them: 62 },
  result: 'W' as const,
  mvp: 'p7',
  rewards: ['+85 XP', '+1 Gold pack', '+2.4 $PSG'],
  playerBreakdown: [
    { playerId: 'p1', base: 6, boost: 1.25, points: 7.5, key: 'Clean sheet (40′)' },
    { playerId: 'p3', base: 8, boost: 1.25, points: 10, key: '2 tackles, 1 assist' },
    { playerId: 'p7', base: 12, boost: 1.25, points: 15, key: 'Goal + assist · MVP' },
    { playerId: 'p11', base: 11, boost: 1.25, points: 13.75, key: 'Goal · 4 chances' },
    { playerId: 'p12', base: 10, boost: 1.18, points: 11.8, key: 'Goal + assist' },
  ],
};
