export interface Country { countryName: string, league: number}

export interface WinDrawData {
  played: number, win: number, draw: number, lose: number,
  goals: { for: number, against: number }
}

export interface LeagueArgs {league: string, season: string}

export interface StandingTeams {
  rank: number, team: { id: number, name: string, logo: string},
  points: number, goalsDiff: number, group: string, form: string, status: string, description: string,
  all: WinDrawData, home: WinDrawData, away: WinDrawData,
  update: string
}

export interface LeagueName {
  league: { id: number, name: string, country: string, logo: string, flag: string, season: number,
             standings: [Array<StandingTeams>]}
}

export interface StandingResponse {
  get: string,
  parameters: LeagueArgs,
  errors: [],
  results: number,
  paging: {current: number, total: number},
  response: Array<LeagueName>
}