import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { of, map, catchError } from 'rxjs';

export enum Currency {
  USD = 'USD',
  UAH = 'UAH',
  EUR = 'EUR',
  BTC = 'BTC',
}

// type CurrencyMap = {
//   [key in Currency]: {
//     [key in Currency]: number;
//   };
// };

// type CurrencyMap = Record<Currency, { [key in Currency]: number }>;
export type CurrencyMap = Record<Currency, Record<Currency, number>>;

// const currencyMap: CurrencyMap = {
//   [Currency.UAH]: {
//     [Currency.USD]: 0.2,
//     [Currency.EUR]: 0.1,
//     [Currency.UAH]: 1
//   },
//   [Currency.USD]: {
//     [Currency.USD]: 1,
//     [Currency.EUR]: 1.02,
//     [Currency.UAH]: 37
//   },
//   [Currency.EUR]: {
//     [Currency.USD]: 0.97,
//     [Currency.EUR]: 1,
//     [Currency.UAH]: 36
//   },
// }

@Injectable({
  providedIn: 'root',
})
export class CurrencyConvService {
  private readonly API_URL =
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  public getCurrencyMap(formated?: boolean): Observable<CurrencyMap> {
    return this.http
      .get<Response>(this.API_URL)
      .pipe(catchError(this.handleError<Response>('getCurrencyMap', [])))
      .pipe(map(this.formatCurrencies));
  }

  public getCurrencyList(formated?: boolean): Observable<Response> {
    return this.http
      .get<Response>(this.API_URL)
      .pipe(catchError(this.handleError<Response>('getCurrencyList', [])));
  }

  private formatCurrencies(props: Response): CurrencyMap {
    const currencyMap = props.reduce<CurrencyMap>((acc: CurrencyMap, item) => {
      const { base_ccy, buy, ccy, sale } = item;

      acc[base_ccy] = {
        ...acc[base_ccy],
        [ccy]: 1 / Number(buy),
        [base_ccy]: 1,
      };

      acc[ccy] = {
        ...acc[ccy],
        [ccy]: 1,
        [base_ccy]: Number(sale),
      };

      return acc;
    }, {} as CurrencyMap);

    return currencyMap;
  }
}
