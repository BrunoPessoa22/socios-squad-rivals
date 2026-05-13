// Team-based mock data matching squad.brunopessoa.com — 5 teams + 1 tactic.

export type TeamType = 'national' | 'club';

export type Team = {
  id: string;
  code: string;
  name: string;
  flag: string;
  type: TeamType;
  rating: number;
  fanToken: string;
  recentForm: ('W' | 'D' | 'L')[];
  nextFixture: {
    opponent: string;
    competition: string;
    home: boolean;
    kickoff: string;
    difficulty: number;
  };
  ftiNote: string;
};

// 9 national + 15 club, mirroring FTI's covered tokens.
export const teams: Team[] = [
  { id: 'arg', code: 'ARG', name: 'Argentina', flag: '🇦🇷', type: 'national', rating: 92, fanToken: '$ARG', recentForm: ['W','W','W','D','W'], nextFixture: { opponent: 'Chile', competition: 'WCQ', home: true, kickoff: 'Sat 21:30', difficulty: 0.35, }, ftiNote: 'WCQ at home vs bottom-3. Goal-rich expected (avg 2.6 in last 5).' },
  { id: 'bra', code: 'BRA', name: 'Brazil', flag: '🇧🇷', type: 'national', rating: 91, fanToken: '$BRA', recentForm: ['W','D','W','W','D'], nextFixture: { opponent: 'Uruguay', competition: 'WCQ', home: false, kickoff: 'Sun 22:00', difficulty: 0.62, }, ftiNote: 'Tough away trip vs derby rival. Clean sheets uncommon (1 in last 5).' },
  { id: 'por', code: 'POR', name: 'Portugal', flag: '🇵🇹', type: 'national', rating: 88, fanToken: '$POR', recentForm: ['W','W','D','W','W'], nextFixture: { opponent: 'Croatia', competition: 'Nations League', home: true, kickoff: 'Sat 20:45', difficulty: 0.45, }, ftiNote: 'On a 4-game unbeaten run. Home advantage strong.' },
  { id: 'fra', code: 'FRA', name: 'France', flag: '🇫🇷', type: 'national', rating: 90, fanToken: '$FRA', recentForm: ['W','L','W','W','D'], nextFixture: { opponent: 'Belgium', competition: 'Nations League', home: false, kickoff: 'Sun 20:45', difficulty: 0.55, }, ftiNote: 'Away vs top-rated rival. Defensive matchup expected.' },
  { id: 'esp', code: 'ESP', name: 'Spain', flag: '🇪🇸', type: 'national', rating: 89, fanToken: '$ESP', recentForm: ['W','W','W','W','D'], nextFixture: { opponent: 'Switzerland', competition: 'Nations League', home: true, kickoff: 'Sat 18:00', difficulty: 0.40, }, ftiNote: 'Reigning Euro champions. Strong home form: 8 wins of last 9.' },
  { id: 'ger', code: 'GER', name: 'Germany', flag: '🇩🇪', type: 'national', rating: 87, fanToken: '$GER', recentForm: ['W','W','D','L','W'], nextFixture: { opponent: 'Hungary', competition: 'Nations League', home: true, kickoff: 'Sat 20:45', difficulty: 0.48, }, ftiNote: 'Mixed form. Home reliability decent (3W-1D in last 4 home).' },
  { id: 'ita', code: 'ITA', name: 'Italy', flag: '🇮🇹', type: 'national', rating: 86, fanToken: '$ITA', recentForm: ['D','W','W','D','W'], nextFixture: { opponent: 'Israel', competition: 'WCQ', home: false, kickoff: 'Sun 20:45', difficulty: 0.42, }, ftiNote: 'WCQ away vs lower-ranked. Clean-sheet odds favourable.' },
  { id: 'eng', code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', type: 'national', rating: 88, fanToken: '$ENG', recentForm: ['W','W','W','D','L'], nextFixture: { opponent: 'Greece', competition: 'Nations League', home: true, kickoff: 'Sat 18:00', difficulty: 0.38, }, ftiNote: 'Recent loss in mid-form context. Home draw vs lower-tier expected.' },
  { id: 'ned', code: 'NED', name: 'Netherlands', flag: '🇳🇱', type: 'national', rating: 85, fanToken: '$NED', recentForm: ['W','D','L','W','W'], nextFixture: { opponent: 'Bosnia', competition: 'Nations League', home: true, kickoff: 'Sun 20:45', difficulty: 0.45, }, ftiNote: 'High-scoring side (avg 2.8 goals scored / match). Captain candidate.' },
  // Clubs
  { id: 'psg', code: 'PSG', name: 'Paris Saint-Germain', flag: '🇫🇷', type: 'club', rating: 88, fanToken: '$PSG', recentForm: ['W','W','W','D','W'], nextFixture: { opponent: 'Reims', competition: 'Ligue 1', home: true, kickoff: 'Sat 21:00', difficulty: 0.25, }, ftiNote: 'Top of Ligue 1. Home vs bottom-3 — heavy goal expectation.' },
  { id: 'bar', code: 'BAR', name: 'Barcelona', flag: '🇪🇸', type: 'club', rating: 87, fanToken: '$BAR', recentForm: ['W','L','W','W','W'], nextFixture: { opponent: 'Sevilla', competition: 'La Liga', home: true, kickoff: 'Sun 21:00', difficulty: 0.35, }, ftiNote: 'Home form excellent. Yamal in peak form.' },
  { id: 'juv', code: 'JUV', name: 'Juventus', flag: '🇮🇹', type: 'club', rating: 84, fanToken: '$JUV', recentForm: ['D','W','L','D','W'], nextFixture: { opponent: 'Atalanta', competition: 'Serie A', home: false, kickoff: 'Sun 20:45', difficulty: 0.65, }, ftiNote: 'Away vs in-form Atalanta. Inconsistent recent form.' },
  { id: 'city', code: 'CITY', name: 'Manchester City', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', type: 'club', rating: 91, fanToken: '$CITY', recentForm: ['W','W','W','W','D'], nextFixture: { opponent: 'Brighton', competition: 'Premier League', home: true, kickoff: 'Sat 17:30', difficulty: 0.42, }, ftiNote: 'Top-2 favourites for the title. Haaland 9 goals in last 5.' },
  { id: 'acm', code: 'ACM', name: 'AC Milan', flag: '🇮🇹', type: 'club', rating: 83, fanToken: '$ACM', recentForm: ['L','W','W','D','W'], nextFixture: { opponent: 'Lazio', competition: 'Serie A', home: true, kickoff: 'Sat 20:45', difficulty: 0.55, }, ftiNote: 'Home form mid-table. Lazio coming off a derby loss.' },
  { id: 'inter', code: 'INTER', name: 'Inter Milan', flag: '🇮🇹', type: 'club', rating: 87, fanToken: '$INTER', recentForm: ['W','W','D','W','W'], nextFixture: { opponent: 'Genoa', competition: 'Serie A', home: false, kickoff: 'Sun 15:00', difficulty: 0.40, }, ftiNote: 'Serie A leaders. Away win expected.' },
  { id: 'atm', code: 'ATM', name: 'Atletico Madrid', flag: '🇪🇸', type: 'club', rating: 84, fanToken: '$ATM', recentForm: ['D','W','D','W','L'], nextFixture: { opponent: 'Real Madrid', competition: 'La Liga', home: false, kickoff: 'Sun 21:00', difficulty: 0.78, }, ftiNote: 'Derbi madrileño away. Volatile.' },
  { id: 'afc', code: 'AFC', name: 'Arsenal', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', type: 'club', rating: 86, fanToken: '$AFC', recentForm: ['W','D','W','W','L'], nextFixture: { opponent: 'Aston Villa', competition: 'Premier League', home: true, kickoff: 'Sat 15:00', difficulty: 0.55, }, ftiNote: 'Home form solid. Top-4 race.' },
  { id: 'tot', code: 'TOT', name: 'Tottenham', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', type: 'club', rating: 82, fanToken: '$TOT', recentForm: ['L','W','L','W','D'], nextFixture: { opponent: 'Wolves', competition: 'Premier League', home: false, kickoff: 'Sun 14:00', difficulty: 0.48, }, ftiNote: 'Patchy form. Volatile pick.' },
  { id: 'asr', code: 'ASR', name: 'AS Roma', flag: '🇮🇹', type: 'club', rating: 81, fanToken: '$ASR', recentForm: ['W','D','L','W','D'], nextFixture: { opponent: 'Hellas Verona', competition: 'Serie A', home: true, kickoff: 'Sat 18:00', difficulty: 0.38, }, ftiNote: 'Home vs bottom-half. Manageable.' },
  { id: 'nap', code: 'NAP', name: 'Napoli', flag: '🇮🇹', type: 'club', rating: 85, fanToken: '$NAP', recentForm: ['W','W','D','W','W'], nextFixture: { opponent: 'Empoli', competition: 'Serie A', home: false, kickoff: 'Sat 20:45', difficulty: 0.32, }, ftiNote: 'In-form, big away favourites.' },
  { id: 'gal', code: 'GAL', name: 'Galatasaray', flag: '🇹🇷', type: 'club', rating: 79, fanToken: '$GAL', recentForm: ['W','W','W','D','W'], nextFixture: { opponent: 'Trabzonspor', competition: 'Süper Lig', home: true, kickoff: 'Sat 19:00', difficulty: 0.42, }, ftiNote: 'Süper Lig leaders, home for derby.' },
  { id: 'mengo', code: 'MENGO', name: 'Flamengo', flag: '🇧🇷', type: 'club', rating: 80, fanToken: '$MENGO', recentForm: ['W','D','W','L','W'], nextFixture: { opponent: 'Palmeiras', competition: 'Brasileirão', home: true, kickoff: 'Sun 18:30', difficulty: 0.62, }, ftiNote: 'Marquee derby. High-variance week.' },
  { id: 'santos', code: 'SANTOS', name: 'Santos', flag: '🇧🇷', type: 'club', rating: 76, fanToken: '$SANTOS', recentForm: ['L','W','D','W','D'], nextFixture: { opponent: 'Corinthians', competition: 'Brasileirão', home: false, kickoff: 'Sun 16:00', difficulty: 0.70, }, ftiNote: 'Classico away. Underdog tactic candidate.' },
  { id: 'spfc', code: 'SPFC', name: 'São Paulo', flag: '🇧🇷', type: 'club', rating: 78, fanToken: '$SPFC', recentForm: ['D','W','W','D','W'], nextFixture: { opponent: 'Cruzeiro', competition: 'Brasileirão', home: true, kickoff: 'Sat 21:00', difficulty: 0.48, }, ftiNote: 'Solid home form, mid-table opponent.' },
];

export type Tactic = {
  id: string;
  name: string;
  tagline: string;
  bonus: string;
  longBonus: string;
};

export const tactics: Tactic[] = [
  { id: 'storm',    name: 'Storm',    tagline: 'High-scoring weeks',  bonus: '+50% early-opener',  longBonus: 'Doubles the early-opener bonus on every slot. Bet on attacking matchups.' },
  { id: 'frost',    name: 'Frost',    tagline: 'Defensive wall',      bonus: '+50% clean-sheet',   longBonus: 'Doubles the clean-sheet bonus on every slot. Bet on low-scoring matchups.' },
  { id: 'fortress', name: 'Fortress', tagline: 'Draw insurance',      bonus: '+5 floor per slot',  longBonus: 'Adds a +5 floor per slot regardless of result. Safe in tough fixture weeks.' },
  { id: 'guerrilla',name: 'Guerrilla',tagline: 'Underdog upside',     bonus: '×2 win bonus underdog', longBonus: 'Doubles win bonus only when your team is the lower-rated side. Punter favourite.' },
  { id: 'chaos',    name: 'Chaos',    tagline: 'Captain ×3',          bonus: 'Captain ×3 + goals ×1.5', longBonus: 'Captain points triple instead of double; all goal points 1.5×. Max ceiling, max variance.' },
  { id: 'balanced', name: 'Balanced', tagline: 'No tilt',             bonus: 'No modifier',        longBonus: 'No tactical tilt — pure scoring formula. Default option.' },
];

export const userTokens = [
  { symbol: '$PSG',   balance: 142, club: 'Paris Saint-Germain' },
  { symbol: '$BAR',   balance: 88,  club: 'FC Barcelona' },
  { symbol: '$JUV',   balance: 36,  club: 'Juventus' },
  { symbol: '$CITY',  balance: 12,  club: 'Manchester City' },
  { symbol: '$POR',   balance: 22,  club: 'Portugal' },
  { symbol: '$BRA',   balance: 18,  club: 'Brazil' },
];

// === Assistants ============================================================

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
  { id: 'andrea',  name: 'Andrea',  age: 33, country: 'Italy',   countryFlag: '🇮🇹', style: 'banker',      styleLabel: 'The Banker',      tagline: 'High floor over high ceiling', bio: 'Picks reliable home favourites. Avoids volatile derby fixtures. Wins consistently.', intro: "Great call, boss. Let's get you set up.", coachLine: 'Safest 5 — favourites at home, no upset risk', photo: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=andrea',  accentHue: 220, philosophy: ['Fixture difficulty ≤ 0.5', 'Home favourites only', 'Captain = highest-rated team'],     signaturePhrase: 'Slow and steady, boss.' },
  { id: 'sofia',   name: 'Sofia',   age: 29, country: 'Spain',   countryFlag: '🇪🇸', style: 'analyst',     styleLabel: 'The Analyst',     tagline: 'Balanced — FTI default',       bio: 'Equal weights across form, fixture, boost, and FTI signals.',          intro: 'Welcome. Let me read your wallet first.', coachLine: 'Balanced read — equal weights across form, fixture, boost, signal', photo: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=sofia',   accentHue: 340, philosophy: ['Equal weights on all factors', 'Captain on top weighted-score', 'No tactical tilt'],     signaturePhrase: 'Trust the model.' },
  { id: 'marcus',  name: 'Marcus',  age: 38, country: 'Germany', countryFlag: '🇩🇪', style: 'punter',      styleLabel: 'The Punter',      tagline: 'High ceiling, accepted variance', bio: 'Picks explosive matchups. Captains high-variance teams. Chaos tactic favourite.', intro: "Let's go. We play to win the matchday.", coachLine: 'Going big — highest-ceiling 5, captain on max-variance', photo: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=marcus',  accentHue: 12,  philosophy: ['Goal-rich matchups', 'Captain on max-volatility', 'Chaos tactic default'],              signaturePhrase: 'No guts, no glory.' },
  { id: 'yuki',    name: 'Yuki',    age: 31, country: 'Japan',   countryFlag: '🇯🇵', style: 'diversifier', styleLabel: 'The Diversifier', tagline: 'Hedge across competitions',    bio: 'Spreads picks across leagues. Resilient to single-league disasters.', intro: 'Hello. I have read 12 of your last matches.', coachLine: 'Hedged across leagues — every confidence band covered', photo: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=yuki',    accentHue: 280, philosophy: ['Max 2 teams per competition', 'Mix national + club', 'Captain on biggest boost'],     signaturePhrase: 'Steady wins.' },
  { id: 'khaled',  name: 'Khaled',  age: 27, country: 'Morocco', countryFlag: '🇲🇦', style: 'loyalist',    styleLabel: 'The Loyalist',    tagline: 'Boost-first, club-first',      bio: 'Refuses to pick teams whose token you don\'t hold. Maximises boost stacking.', intro: 'Salam. We ride for the clubs you hold — no one else.', coachLine: "Won't pick a team you don't own — we ride for yours", photo: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=khaled',  accentHue: 145, philosophy: ['Held-token teams only', 'Boost weight 0.5 (vs 0.2 default)', 'Surfaces buy prompts'], signaturePhrase: 'Hold the colours.' },
  { id: 'olivia',  name: 'Olivia',  age: 35, country: 'Brazil',  countryFlag: '🇧🇷', style: 'form-chaser', styleLabel: 'The Form-Chaser', tagline: 'Last 3 matches dominate',      bio: 'Picks teams on hot streaks. Drops cold teams even if rating is high.', intro: "Oi! Let's pick who is on fire right now.", coachLine: 'Picked who is hot — last 3 matches dominate the score', photo: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=olivia',  accentHue: 50,  philosophy: ['Form weight 0.5', 'Drop cold teams', 'Captain on hottest streak'],                     signaturePhrase: 'Ride the wave.' },
];

// === Per-assistant recommendation =========================================

export type AssistantRec = {
  slots: { teamId: string; captain: boolean; reason: string }[];
  tacticId: string;
  tokensActivated: string[];
  confidence: number;
  summary: string;
  scoringTilt: { factor: string; weight: number }[];
  warnings: { severity: 'info' | 'warn'; title: string; body: string }[];
};

export const recommendations: Record<AssistantStyle, AssistantRec> = {
  banker: {
    slots: [
      { teamId: 'arg',  captain: true,  reason: 'WCQ home vs Chile. Highest-rated favourite in your eligible pool.' },
      { teamId: 'esp',  captain: false, reason: 'Nations League home vs Switzerland — 8 home wins in last 9.' },
      { teamId: 'psg',  captain: false, reason: 'Ligue 1 home vs Reims. Difficulty 0.25.' },
      { teamId: 'city', captain: false, reason: 'Home vs Brighton. Title favourites, low upset risk.' },
      { teamId: 'inter',captain: false, reason: 'Serie A away vs Genoa — leaders comfortable.' },
    ],
    tacticId: 'fortress',
    tokensActivated: ['$PSG', '$BAR', '$CITY', '$POR', '$BRA'],
    confidence: 82,
    summary: 'Five home favourites, lowest combined fixture difficulty. Fortress tactic for the +5 floor — no upset disasters.',
    scoringTilt: [
      { factor: 'Fixture difficulty (inverse opp)', weight: 0.30 },
      { factor: 'Recent form (last 5)',             weight: 0.20 },
      { factor: 'Home / away',                      weight: 0.20 },
      { factor: 'Active boost (tokens)',            weight: 0.15 },
      { factor: 'Team rating',                      weight: 0.10 },
      { factor: 'FTI signal_bundle',                weight: 0.05 },
    ],
    warnings: [],
  },

  analyst: {
    slots: [
      { teamId: 'arg',  captain: true,  reason: 'Top-rated, favourable fixture, $ARG token boost — equal-weighted top score.' },
      { teamId: 'city', captain: false, reason: 'Premier League leaders. Haaland 9 goals in last 5.' },
      { teamId: 'psg',  captain: false, reason: 'Heavy home favourite, boost +10% from $PSG.' },
      { teamId: 'bar',  captain: false, reason: 'Home La Liga win expected. $BAR boost active.' },
      { teamId: 'esp',  captain: false, reason: 'Nations League home, in form, $ESP fixture difficulty 0.40.' },
    ],
    tacticId: 'balanced',
    tokensActivated: ['$PSG', '$BAR', '$CITY', '$BRA', '$POR'],
    confidence: 78,
    summary: 'Balanced read — top weighted score across form, fixture, boost, signal. Default tactic.',
    scoringTilt: [
      { factor: 'Recent form (last 5)',             weight: 0.20 },
      { factor: 'Fixture difficulty',               weight: 0.20 },
      { factor: 'Team rating',                      weight: 0.20 },
      { factor: 'Active boost (tokens)',            weight: 0.20 },
      { factor: 'Home / away',                      weight: 0.10 },
      { factor: 'FTI signal_bundle',                weight: 0.10 },
    ],
    warnings: [],
  },

  punter: {
    slots: [
      { teamId: 'arg',   captain: false, reason: 'Captain candidate but I prefer ceiling — Brazil derby has higher variance.' },
      { teamId: 'bra',   captain: true,  reason: 'CAPTAIN. Uruguay derby — goal-rich expected, captain ×3 under Chaos.' },
      { teamId: 'mengo', captain: false, reason: 'Flamengo–Palmeiras marquee. Either way, points.' },
      { teamId: 'city',  captain: false, reason: 'Haaland ceiling. Could put up 4+ goals.' },
      { teamId: 'gal',   captain: false, reason: 'Galatasaray–Trabzonspor derby. High goal expectation.' },
    ],
    tacticId: 'chaos',
    tokensActivated: ['$BRA', '$CITY', '$PSG', '$BAR', '$POR'],
    confidence: 64,
    summary: 'Chaos tactic — captain ×3, goals ×1.5. Picked derby/high-variance fixtures. Expected range 180–620 points vs Analyst 290–390.',
    scoringTilt: [
      { factor: 'FTI signal_bundle (ceiling)',      weight: 0.30 },
      { factor: 'Recent form (last 5)',             weight: 0.25 },
      { factor: 'Team rating',                      weight: 0.15 },
      { factor: 'Active boost (tokens)',            weight: 0.15 },
      { factor: 'Home / away',                      weight: 0.10 },
      { factor: 'Fixture difficulty',               weight: 0.05 },
    ],
    warnings: [
      { severity: 'info', title: 'High variance week', body: 'Chaos captain ×3 on Brazil away derby = wide outcome distribution. Live with it.' },
    ],
  },

  diversifier: {
    slots: [
      { teamId: 'arg',   captain: false, reason: 'WCQ slot (national level coverage).' },
      { teamId: 'psg',   captain: false, reason: 'Ligue 1 slot. Top boost holder.' },
      { teamId: 'city',  captain: true,  reason: 'CAPTAIN. Premier League slot — biggest boost contribution outside PSG when ×2.' },
      { teamId: 'inter', captain: false, reason: 'Serie A slot. Leaders away.' },
      { teamId: 'bar',   captain: false, reason: 'La Liga slot. $BAR boost active.' },
    ],
    tacticId: 'balanced',
    tokensActivated: ['$PSG', '$BAR', '$CITY', '$BRA', '$POR'],
    confidence: 75,
    summary: 'One team per competition (5 different leagues/comps). No single match-day disaster sinks the score. Captain on CITY for boost ×2.',
    scoringTilt: [
      { factor: 'Boost coverage (unique tokens)',   weight: 0.25 },
      { factor: 'League / competition spread',       weight: 0.20 },
      { factor: 'Recent form (last 5)',             weight: 0.20 },
      { factor: 'Fixture difficulty',               weight: 0.15 },
      { factor: 'Team rating',                      weight: 0.15 },
      { factor: 'FTI signal_bundle',                weight: 0.05 },
    ],
    warnings: [],
  },

  loyalist: {
    slots: [
      { teamId: 'psg',  captain: false, reason: '$PSG held — boost +10% active.' },
      { teamId: 'bar',  captain: false, reason: '$BAR held — boost active.' },
      { teamId: 'juv',  captain: false, reason: '$JUV held — your only Serie A boost.' },
      { teamId: 'city', captain: true,  reason: 'CAPTAIN. $CITY held — boost ×2 when captained.' },
      { teamId: 'por',  captain: false, reason: '$POR held — national team coverage during international window.' },
    ],
    tacticId: 'guerrilla',
    tokensActivated: ['$PSG', '$BAR', '$JUV', '$CITY', '$POR', '$BRA'],
    confidence: 70,
    summary: 'Every slot pays your boost. Guerrilla tactic because two of your held teams (JUV away, BAR vs Sevilla) are underdogs — doubled win bonus if they pull it off.',
    scoringTilt: [
      { factor: 'Active boost (tokens)',            weight: 0.50 },
      { factor: 'Recent form (last 5)',             weight: 0.20 },
      { factor: 'Fixture difficulty',               weight: 0.10 },
      { factor: 'FTI signal_bundle',                weight: 0.10 },
      { factor: 'Team rating',                      weight: 0.05 },
      { factor: 'Home / away',                      weight: 0.05 },
    ],
    warnings: [
      { severity: 'info', title: 'Token gap surfaced', body: 'You don\'t hold $INTER or $ARG — could not stack boost across Serie A leaders or Argentina WCQ. Consider adding.' },
    ],
  },

  'form-chaser': {
    slots: [
      { teamId: 'arg',   captain: false, reason: 'L5 form 4W 1D — no L. Hottest in the pool.' },
      { teamId: 'esp',   captain: false, reason: 'L5 form 4W 1D — hot streak continuing.' },
      { teamId: 'por',   captain: false, reason: 'L5 form 4W 1D + home — Croatia.' },
      { teamId: 'nap',   captain: true,  reason: 'CAPTAIN. L3 form 3W — peak. Big away favourite vs Empoli.' },
      { teamId: 'inter', captain: false, reason: 'L5 form 4W 1D — Genoa away comfortable.' },
    ],
    tacticId: 'storm',
    tokensActivated: ['$PSG', '$BAR', '$POR', '$BRA', '$CITY'],
    confidence: 80,
    summary: 'Five teams on 4W+ form in last 5. Storm tactic doubles early-opener bonus — hot teams score early.',
    scoringTilt: [
      { factor: 'Recent form (last 3, weighted)',   weight: 0.45 },
      { factor: 'FTI signal_bundle',                weight: 0.20 },
      { factor: 'Fixture difficulty',               weight: 0.15 },
      { factor: 'Active boost (tokens)',            weight: 0.10 },
      { factor: 'Team rating',                      weight: 0.05 },
      { factor: 'Home / away',                      weight: 0.05 },
    ],
    warnings: [],
  },
};

export function getRecommendation(assistantId: string): AssistantRec {
  const a = assistants.find((x) => x.id === assistantId);
  return recommendations[a?.style ?? 'analyst'];
}
