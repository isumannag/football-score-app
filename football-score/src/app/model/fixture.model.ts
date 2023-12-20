export interface FixtureResponse {
  errors?: [];
  get?: string;
  paging?: {
    current?: number;
    total?: number;
  };
  parameter?: {
    league?: string;
    season?: string;
    team?: string;
  };
  response?: Array<FixturesList>;
  results?: number;
}


export interface FixturesList {
  fixture?: {
    date?: string;
    id?: number;
    periods?: {
      first?: number;
      second?: number;
    };
    refree?: string;
    status?: {
      elapsed?: number;
      long?: string;
      short?: string;
    };
    timestamp?: number;
    timezone?: string;
    venue?: {
      city?: string;
      id?: number;
      name?: string;
    };
  };
  goals?: {
    home?: number;
    away?: number;
  };
  league?: {
    country?: string;
    flag?: string;
    id?: number;
    logo?: string;
    name?: string;
    round?: string;
    season?: number;
  };
  score?: {
    extratime?: scoreNumber;
    fulltime?: scoreNumber;
    halftime?: scoreNumber;
    penality?: scoreNumber;
  };
  teams?: {
    away?: {
      id?: number;
      logo?: string;
      name?: string;
      winner?: boolean;
    };
    home?: {
      id?: number;
      logo?: string;
      name?: string;
      winner?: boolean;
    };
  };
}

export interface scoreNumber {
  home?: number;
  away?: number;
}