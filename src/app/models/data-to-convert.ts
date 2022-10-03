import { currencyCodes } from './response';

export interface FirstData {
  firstAmount: number;
  firstCurrency: currencyCodes | '';
}
export interface SecondData {
  secondAmount: number;
  secondCurrency: currencyCodes | '';
}
