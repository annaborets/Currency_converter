export enum currencyCodes {
  USD = 'USD',
  EUR = 'EUR',
  BTC = 'BTC',
  UAH = 'UAH',
}

interface ResponseItem {
  ccy: currencyCodes;
  base_ccy: currencyCodes;
  buy: string;
  sale: string;
}

export type Response = ResponseItem[];
