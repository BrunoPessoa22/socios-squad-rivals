import type {
  LeaderboardRow,
  Pack,
  Player,
  RewardEntry,
  Rival,
} from './types';

export type AssistantStyle =
  | 'banker'
  | 'analyst'
  | 'punter'
  | 'diversifier'
  | 'loyalist'
  | 'form-chaser';

export type Assistant = {
  id: string;
  name: string;
  age: number;
  country: string;
  countryFlag: string;
  style: AssistantStyle;
  styleLabel: string;
  tagline: string;
  bio: string;
  intro: string;
  coachLine: string;
  photo: string;
  accentHue: number;
  philosophy: string[];
  signaturePhrase: string;
};

export const assistants: Assistant[] = [
  {
    id: 'andrea',
    name: 'Andrea',
    age: 33,
    country: 'Italy',
    countryFlag: '🇮🇹',
    style: 'banker',
    styleLabel: 'The Banker',
    tagline: 'High floor over high ceiling',
    bio: 'Picks proven starters only. Skips anyone with rotation or injury risk. Wins consistently, never spectacularly.',
    intro: "Great call, boss. Let's get you set up, shall we?",
    coachLine: "Picked the safest five — no rotation risk, no injury clouds",
    photo: 'https://i.pravatar.cc/400?img=12',
    accentHue: 220,
    philosophy: [
      'Minutes likelihood ≥ 85%',
      'Avoids fixture difficulty > 0.6',
      'Captain = stable form, not peak form',
    ],
    signaturePhrase: 'Slow and steady, boss.',
  },
  {
    id: 'sofia',
    name: 'Sofia',
    age: 29,
    country: 'Spain',
    countryFlag: '🇪🇸',
    style: 'analyst',
    styleLabel: 'The Analyst',
    tagline: 'Balanced — FTI default',
    bio: 'Equal weights across form, fixture, boost, signals. The textbook pick. Trust the data.',
    intro: 'Welcome. Let me read your wallet first — then we pick together.',
    coachLine: "Balanced read — equal weights across form, fixture, boost, and signal",
    photo: 'https://i.pravatar.cc/400?img=45',
    accentHue: 0,
    philosophy: [
      'Equal weights across all 6 scoring factors',
      'Captain = top weighted-score',
      'No bias toward any single signal',
    ],
    signaturePhrase: 'Trust the model.',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    age: 38,
    country: 'Germany',
    countryFlag: '🇩🇪',
    style: 'punter',
    styleLabel: 'The Punter',
    tagline: 'High ceiling, accepted variance',
    bio: 'Picks explosive over reliable. Captains the most volatile attacker. Wins big or busts.',
    intro: "Let's go. No half-measures — we play to win the matchday.",
    coachLine: "Going big — highest ceiling at every slot, captain on max-variance",
    photo: 'https://i.pravatar.cc/400?img=33',
    accentHue: 12,
    philosophy: [
      'Form weight 0.35, signal weight 0.25',
      'Captain = highest single-match ceiling',
      'Tolerates rotation risk for upside',
    ],
    signaturePhrase: 'No guts, no glory.',
  },
  {
    id: 'yuki',
    name: 'Yuki',
    age: 31,
    country: 'Japan',
    countryFlag: '🇯🇵',
    style: 'diversifier',
    styleLabel: 'The Diversifier',
    tagline: 'Hedge across all your tokens',
    bio: 'One player per held club where possible. Spreads boost activations. Resilient to single-team disasters.',
    intro: 'Hello. I have read 12 of your last matches. Let me ask a few questions.',
    coachLine: "Hedged across all four clubs you hold — every boost active",
    photo: 'https://i.pravatar.cc/400?img=47',
    accentHue: 280,
    philosophy: [
      'Max 2 players per club',
      'Boost coverage ≥ 4 clubs when possible',
      'Captain on largest boost holder',
    ],
    signaturePhrase: 'Steady wins.',
  },
  {
    id: 'khaled',
    name: 'Khaled',
    age: 27,
    country: 'Morocco',
    countryFlag: '🇲🇦',
    style: 'loyalist',
    styleLabel: 'The Loyalist',
    tagline: 'Boost-first, club-first',
    bio: 'Refuses to pick non-held-team players. Leaves slots vacant rather than dilute the boost. Holding more tokens = more options.',
    intro: 'Salam. We ride for the clubs you hold — no one else.',
    coachLine: "Won't pick a player from a club you don't hold — we ride for yours",
    photo: 'https://i.pravatar.cc/400?img=8',
    accentHue: 145,
    philosophy: [
      'Boost weight 0.50 (vs default 0.20)',
      'Refuses non-held clubs even if slot stays empty',
      'Surfaces token-acquisition prompts',
    ],
    signaturePhrase: 'Hold the colours.',
  },
  {
    id: 'olivia',
    name: 'Olivia',
    age: 35,
    country: 'Brazil',
    countryFlag: '🇧🇷',
    style: 'form-chaser',
    styleLabel: 'The Form-Chaser',
    tagline: 'Last 3 matches dominate',
    bio: 'Picks who is hot right now. Last 3 matches weighted heavier than season-long. Ignores reputation.',
    intro: "Oi! Let's pick who is on fire right now. The rest is noise.",
    coachLine: "Picked who is hot right now — last-3-match form dominates the scoring",
    photo: 'https://i.pravatar.cc/400?img=24',
    accentHue: 50,
    philosophy: [
      'Form weight 0.50 (last 3 matches)',
      'Drops players on cold streak even with good fixture',
      'Captain = highest recent score, not season avg',
    ],
    signaturePhrase: 'Ride the wave.',
  },
];

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

export type CoachPick = {
  slot: string;
  playerId: string;
  captain: boolean;
  note: string;
  citedStat: { label: string; value: string };
  boostToken: string;
  boostMultiplier: number;
  ftiSources: string[];
};

export type CoachWarning = {
  kind: string;
  severity: 'info' | 'warn';
  title: string;
  body: string;
};

export type CoachOutput = {
  generatedAt: string;
  matchday: string;
  confidence: number;
  summary: string;
  lineup: (CoachPick | { slot: string; vacant: true; reason: string })[];
  warnings: CoachWarning[];
  ftiCallsSummary: { tool: string; latency: string }[];
  scoringBreakdown: { factor: string; weight: number }[];
};

const baseFtiCalls = [
  { tool: 'wallet_balance', latency: '120ms' },
  { tool: 'token_metadata × 4', latency: '180ms' },
  { tool: 'match_calendar', latency: '210ms' },
  { tool: 'sports_profile × 4', latency: '340ms' },
  { tool: 'match_correlation × 4', latency: '290ms' },
  { tool: 'signal_bundle', latency: '180ms' },
  { tool: 'token_sensitivity', latency: '90ms' },
];

const matchday = 'Matchday 33 · 17–18 May';
const generatedAt = '2026-05-13 08:14 UTC';

// Equal-weight baseline (Analyst). Other styles tilt these.
const baseWeights = [
  { factor: 'Form (last 5, recency-weighted)', weight: 0.25 },
  { factor: 'Fixture difficulty (inverse opp strength)', weight: 0.20 },
  { factor: 'Home / away modifier', weight: 0.10 },
  { factor: 'Minutes likelihood (rotation risk)', weight: 0.15 },
  { factor: 'Effective boost (balance × sensitivity)', weight: 0.20 },
  { factor: 'FTI signal_bundle confidence', weight: 0.10 },
];

const outputs: Record<AssistantStyle, CoachOutput> = {
  analyst: {
    generatedAt,
    matchday,
    confidence: 84,
    summary:
      'Balanced read. Vitinha captain for the highest weighted score in your pool. Raphinha flagged 75% fit — Yamal in.',
    lineup: [
      { slot: 'GK', playerId: 'p1', captain: false, note: 'PSG conceded 0.4 xGA in last 5 home games; Reims away form is bottom-3 of Ligue 1.', citedStat: { label: 'xGA / home / L5', value: '0.40' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile', 'match_correlation'] },
      { slot: 'DEF', playerId: 'p3', captain: false, note: 'Back from suspension; 2 assists in last 3 meetings vs Reims.', citedStat: { label: 'Assists vs Reims (L3)', value: '2' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['match_correlation'] },
      { slot: 'MID', playerId: 'p7', captain: true, note: 'Captain. Form 8.2 over last 5 — highest in your eligible MID pool. 2× boost on PSG.', citedStat: { label: 'Form index (L5)', value: '8.2' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile', 'signal_bundle'] },
      { slot: 'FWD', playerId: 'p11', captain: false, note: 'Scored in last 3 meetings vs Reims; signal_bundle confidence 0.81 for PSG attackers.', citedStat: { label: 'Signal confidence', value: '0.81' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['signal_bundle'] },
      { slot: 'FWD', playerId: 'p12', captain: false, note: 'Form 9.0; Barça home vs Sevilla. $BAR boost +18% applies.', citedStat: { label: 'Form index (L5)', value: '9.0' }, boostToken: '$BAR', boostMultiplier: 1.18, ftiSources: ['sports_profile'] },
    ],
    warnings: [
      { kind: 'injury', severity: 'warn', title: 'Raphinha — minor knock', body: 'Listed 75% fit in latest sports_profile. Yamal in instead.' },
    ],
    ftiCallsSummary: baseFtiCalls,
    scoringBreakdown: baseWeights,
  },

  banker: {
    generatedAt,
    matchday,
    confidence: 78,
    summary:
      'Safest five. Haaland over Yamal for FWD-2 (less rotation risk this week). Captain on Vitinha — stable form, no injury cloud. Lower ceiling but I sleep at night.',
    lineup: [
      { slot: 'GK', playerId: 'p1', captain: false, note: 'Every-week starter, 99 minutes per match last 5. No rotation risk.', citedStat: { label: 'Mins per match (L5)', value: '99' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'DEF', playerId: 'p3', captain: false, note: 'Started all 38 league matches last season — never rotated. Form 7.4.', citedStat: { label: 'Started last L5', value: '5/5' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'MID', playerId: 'p7', captain: true, note: 'Captain. Form 8.2, never rotated, no injury history. The safest captain in your pool.', citedStat: { label: 'Form index (L5)', value: '8.2' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile', 'signal_bundle'] },
      { slot: 'FWD', playerId: 'p11', captain: false, note: 'PSG starter, 3 goals in last 3. Predictable output.', citedStat: { label: 'Goals (L3)', value: '3' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['match_correlation'] },
      { slot: 'FWD', playerId: 'p14', captain: false, note: 'Skipped Yamal here — Barça rotates in cup weeks. Haaland never rotated in 2026, form 8.8.', citedStat: { label: 'Form index (L5)', value: '8.8' }, boostToken: '$CITY', boostMultiplier: 1.05, ftiSources: ['sports_profile'] },
    ],
    warnings: [
      { kind: 'rotation', severity: 'info', title: 'Avoided Yamal', body: 'Barça often rotates Yamal in cup weeks. Haaland has started every Premier League match in 2026.' },
    ],
    ftiCallsSummary: baseFtiCalls,
    scoringBreakdown: [
      { factor: 'Minutes likelihood (rotation risk)', weight: 0.30 },
      { factor: 'Fixture difficulty (inverse opp strength)', weight: 0.25 },
      { factor: 'Form (last 5, recency-weighted)', weight: 0.20 },
      { factor: 'Effective boost (balance × sensitivity)', weight: 0.15 },
      { factor: 'FTI signal_bundle confidence', weight: 0.05 },
      { factor: 'Home / away modifier', weight: 0.05 },
    ],
  },

  punter: {
    generatedAt,
    matchday,
    confidence: 71,
    summary:
      'Going for ceiling. Haaland captain — he scored 10/10 two matches ago. Yamal + Haaland front 2 = max possible output. Variance is the price.',
    lineup: [
      { slot: 'GK', playerId: 'p1', captain: false, note: 'Same GK — variance plays don\'t apply here.', citedStat: { label: 'xGA / home / L5', value: '0.40' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'DEF', playerId: 'p3', captain: false, note: 'Attacking fullback. 2 assists L3, FTI signal confidence 0.78 for PSG to score 2+.', citedStat: { label: 'Signal confidence', value: '0.78' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['signal_bundle'] },
      { slot: 'MID', playerId: 'p7', captain: false, note: 'High form, but not captain this week — captaincy belongs to the ceiling pick.', citedStat: { label: 'Form index (L5)', value: '8.2' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'FWD', playerId: 'p12', captain: false, note: 'Form 9.0, peak match score 9 in 4 of last 5. High ceiling pick.', citedStat: { label: 'Form index (L5)', value: '9.0' }, boostToken: '$BAR', boostMultiplier: 1.18, ftiSources: ['sports_profile'] },
      { slot: 'FWD', playerId: 'p14', captain: true, note: 'Captain. Scored 10 in last meeting vs Wolves. Highest single-match ceiling in your pool. 2× CITY boost.', citedStat: { label: 'Peak score (L5)', value: '10' }, boostToken: '$CITY', boostMultiplier: 1.05, ftiSources: ['signal_bundle', 'match_impact_history'] },
    ],
    warnings: [
      { kind: 'variance', severity: 'info', title: 'High variance week', body: 'Captain on Haaland doubles the volatility. Expected range: 45–95 points (vs Analyst 60–80).' },
    ],
    ftiCallsSummary: baseFtiCalls,
    scoringBreakdown: [
      { factor: 'Form (last 5, recency-weighted)', weight: 0.35 },
      { factor: 'FTI signal_bundle confidence', weight: 0.25 },
      { factor: 'Effective boost (balance × sensitivity)', weight: 0.20 },
      { factor: 'Fixture difficulty (inverse opp strength)', weight: 0.10 },
      { factor: 'Home / away modifier', weight: 0.05 },
      { factor: 'Minutes likelihood (rotation risk)', weight: 0.05 },
    ],
  },

  loyalist: {
    generatedAt,
    matchday,
    confidence: 69,
    summary:
      'Four $PSG starters — I refuse to dilute the boost. FWD-2 is vacant: you don\'t hold a second PSG-eligible attacker. Buy more $PSG or accept the 4-player penalty.',
    lineup: [
      { slot: 'GK', playerId: 'p1', captain: false, note: 'PSG. $PSG boost +25% active.', citedStat: { label: 'Boost', value: '+25%' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['token_sensitivity'] },
      { slot: 'DEF', playerId: 'p3', captain: false, note: 'PSG. Boost stacks, fixture is home vs bottom-3.', citedStat: { label: 'Boost', value: '+25%' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['token_sensitivity'] },
      { slot: 'MID', playerId: 'p7', captain: true, note: 'Captain. PSG. Double boost = +50% effective. Highest yield slot.', citedStat: { label: 'Effective boost (C)', value: '+50%' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['token_sensitivity', 'signal_bundle'] },
      { slot: 'FWD', playerId: 'p11', captain: false, note: 'PSG. Form 8.2, 3 goals L3 vs Reims. Last PSG attacker available.', citedStat: { label: 'Goals (L3)', value: '3' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['match_correlation'] },
      { slot: 'FWD', vacant: true, reason: 'You hold no other $PSG-eligible FWD. I will not pick a non-held-team player. Consider acquiring $PSG or another striker from a held club.' },
    ],
    warnings: [
      { kind: 'token-gap', severity: 'warn', title: 'Token gap detected', body: 'Your $PSG holdings cover 4/5 slots. Adding 50 $PSG would let me cover all 5 with full boost. Or hold a $BAR/$JUV/$CITY FWD to fill the vacancy.' },
    ],
    ftiCallsSummary: baseFtiCalls,
    scoringBreakdown: [
      { factor: 'Effective boost (balance × sensitivity)', weight: 0.50 },
      { factor: 'Form (last 5, recency-weighted)', weight: 0.20 },
      { factor: 'Fixture difficulty (inverse opp strength)', weight: 0.10 },
      { factor: 'FTI signal_bundle confidence', weight: 0.10 },
      { factor: 'Minutes likelihood (rotation risk)', weight: 0.05 },
      { factor: 'Home / away modifier', weight: 0.05 },
    ],
  },

  diversifier: {
    generatedAt,
    matchday,
    confidence: 76,
    summary:
      'Hedged across all four clubs you hold. One bad week from any single team doesn\'t sink the matchday. Captain on Foden — biggest non-PSG boost contribution.',
    lineup: [
      { slot: 'GK', playerId: 'p1', captain: false, note: 'PSG slot. Form 6.6 but reliable; trades upside for boost coverage.', citedStat: { label: 'Form index (L5)', value: '6.6' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'DEF', playerId: 'p4', captain: false, note: 'BAR slot. Cubarsí stable form, $BAR boost +18%.', citedStat: { label: 'Form index (L5)', value: '7.4' }, boostToken: '$BAR', boostMultiplier: 1.18, ftiSources: ['sports_profile'] },
      { slot: 'MID', playerId: 'p10', captain: true, note: 'Captain. CITY slot — your lightest holding, captaining doubles the modest boost. Form 8.0, never rotated.', citedStat: { label: 'Form index (L5)', value: '8.0' }, boostToken: '$CITY', boostMultiplier: 1.05, ftiSources: ['sports_profile', 'signal_bundle'] },
      { slot: 'FWD', playerId: 'p13', captain: false, note: 'JUV slot. Vlahović form 6.8 — coverage over ceiling. $JUV +10% active.', citedStat: { label: 'Form index (L5)', value: '6.8' }, boostToken: '$JUV', boostMultiplier: 1.10, ftiSources: ['sports_profile'] },
      { slot: 'FWD', playerId: 'p11', captain: false, note: 'PSG repeat — only allowed double, on the highest-boost club.', citedStat: { label: 'Boost', value: '+25%' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['token_sensitivity'] },
    ],
    warnings: [
      { kind: 'coverage', severity: 'info', title: 'All 4 boosts active', body: 'Every fan token you hold contributes to this lineup. Maximum hedge.' },
    ],
    ftiCallsSummary: baseFtiCalls,
    scoringBreakdown: [
      { factor: 'Effective boost (balance × sensitivity)', weight: 0.25 },
      { factor: 'Boost-coverage bonus (unique clubs)', weight: 0.20 },
      { factor: 'Form (last 5, recency-weighted)', weight: 0.20 },
      { factor: 'Fixture difficulty (inverse opp strength)', weight: 0.15 },
      { factor: 'Minutes likelihood (rotation risk)', weight: 0.15 },
      { factor: 'FTI signal_bundle confidence', weight: 0.05 },
    ],
  },

  'form-chaser': {
    generatedAt,
    matchday,
    confidence: 81,
    summary:
      'Picked who is hot now. Yamal + Haaland — both form 8.8 in last 5, both peaked 9–10 in last 3. Captain on Yamal — last 3 matches average 9.0. Reputations off, recent data on.',
    lineup: [
      { slot: 'GK', playerId: 'p1', captain: false, note: 'Form 6.6 L5, but L3 average 6.7 — stable. Slight cold week, kept anyway.', citedStat: { label: 'Form (L3)', value: '6.7' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'DEF', playerId: 'p3', captain: false, note: 'L3 form = 7.7 (vs season 7.4). Trending up — kept.', citedStat: { label: 'L3 form trend', value: '+0.3' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'MID', playerId: 'p7', captain: false, note: 'L3 form 8.0 — slight cool-off from peak. Still top MID by recency.', citedStat: { label: 'L3 form', value: '8.0' }, boostToken: '$PSG', boostMultiplier: 1.25, ftiSources: ['sports_profile'] },
      { slot: 'FWD', playerId: 'p12', captain: true, note: 'Captain. L3 form 8.7. Hottest player in your held pool right now. 2× $BAR boost.', citedStat: { label: 'L3 form', value: '8.7' }, boostToken: '$BAR', boostMultiplier: 1.18, ftiSources: ['sports_profile', 'signal_bundle'] },
      { slot: 'FWD', playerId: 'p14', captain: false, note: 'L3 form 9.0 — peak 10 two matches ago. Cold reputation, hot last 3.', citedStat: { label: 'L3 form', value: '9.0' }, boostToken: '$CITY', boostMultiplier: 1.05, ftiSources: ['sports_profile'] },
    ],
    warnings: [
      { kind: 'recency-bias', severity: 'info', title: 'Recency bias on', body: 'I drop players on cold streaks even if season-long stats look good. Dembélé\'s season is fine but L3 trend is flat — Haaland in.' },
    ],
    ftiCallsSummary: baseFtiCalls,
    scoringBreakdown: [
      { factor: 'Form (last 3, recency-weighted)', weight: 0.50 },
      { factor: 'FTI signal_bundle confidence', weight: 0.20 },
      { factor: 'Fixture difficulty (inverse opp strength)', weight: 0.15 },
      { factor: 'Effective boost (balance × sensitivity)', weight: 0.10 },
      { factor: 'Home / away modifier', weight: 0.03 },
      { factor: 'Minutes likelihood (rotation risk)', weight: 0.02 },
    ],
  },
};

export function getCoachOutput(assistantId: string): CoachOutput {
  const a = assistants.find((x) => x.id === assistantId);
  const style: AssistantStyle = a?.style ?? 'analyst';
  return outputs[style];
}

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
