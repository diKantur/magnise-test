interface IObjectKeys {
  [key:string]: string|number|undefined
}

export interface IURLParams extends IObjectKeys {
  provider: string;
  kind?: string;
  symbol?: string;
  page?: number;
  size?: number;
}

export interface IBarsParams extends IObjectKeys {
  instrumentId: string;
  provider: string;
  interval: number;
  periodicity: string;
  barsCount?: number;
  startDate?: string;
  endDate?: string;
  timeBack?: string;
}

export interface IToken {
  access_token: string;
  expires_in: number;
  // 'not-before-policy': number;
  refresh_expires_in: 3600;
  refresh_token: string;
  // scope: string;
  session_state: string;
  token_type: string;
}
