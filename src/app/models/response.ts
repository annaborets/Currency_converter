export enum currencyCodes {
  USD = 'USD',
  EUR = 'EUR',
  BTC = 'BTC',
  //   RUR = 'RUR',
  UAH = 'UAH',
}

interface ResponseItem {
  ccy: currencyCodes;
  //   base_ccy: 'UAH';
  base_ccy: currencyCodes;
  buy: string;
  sale: string;
}

export type Response = ResponseItem[];

// {ccy: 'USD', base_ccy: 'UAH', value: '41.20000', }
// {ccy: 'UAH', base_ccy: 'USD',  value: '41.70000'}
// {ccy: 'EUR', base_ccy: 'UAH', value: '39.60000',}
// {ccy: 'UAH', base_ccy: 'EUR',  value: '40.60000'}
// {ccy: 'USD', base_ccy: 'EUR',  value: '0'}
// {ccy: 'EUR', base_ccy: 'USD',  value: '0'}
