export interface LeagueName {
  league?: {
    id?: number;
    name?: string;
    country?: string;
    logo?: string;
    flag?: string;
    season?: number;
    standings?: [Array<StandingTeams>];
  };
}


export interface StandingTeams {
  rank?: number;
  team?: {
    id?: number;
    name?: string;
    logo?: string;
  };
  points?: number;
  goalsDiff?: number;
  group?: string;
  form?: string;
  status?: string;
  description?: string;
  all?: {
    played?: number;
    win?: number;
    draw?: number;
    lose?: number;
    goals: {
      for?: number;
      against?: number;
    };
  };
  home?: {
    played?: number;
    win?: number;
    draw?: number;
    lose?: number;
    goals?: {
      for?: number;
      against?: number;
    };
  };
  away?: {
    played?: number;
    win?: number;
    draw?: number;
    lose?: number;
    goals?: {
      for?: number;
      against?: number;
    };
  };
  update?: string;
}

export interface StandingResponse {
  parameters?: LeagueArg;
  errors?: [];
  results?: number;
  paging?: {
    current: number;
    total: number;
  };
  response?: Array<LeagueName>;
}

export interface LeagueArg {
  league?: string;
  season?: string;
}