import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirstData, SecondData } from 'src/app/models/data-to-convert';
import {
  Currency,
  CurrencyConvService,
  CurrencyMap,
} from 'src/app/services/currency-conv.service';
import { Response } from 'src/app/models/response';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

type Direction = 'to' | 'from';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  public currencyTypes = Currency;
  public currencyMap: CurrencyMap | null = null;

  private subscription: Subscription = Subscription.EMPTY;

  public fromValue: number = 0;
  public toValue: number = 0;
  public selectedFromValue: Currency | null = null;
  public selectedToValue: Currency | null = null;

  constructor(private currencyService: CurrencyConvService) {}

  ngOnInit(): void {
    this.getCurrencyMap();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeValueTo(event: any) {
    this.toValue = +event.target.value;

    this.recalculate('from');
  }

  public changeValueFrom(event: any) {
    this.fromValue = +event.target.value;
    this.recalculate('to');
  }

  public changeFromCurrency(event: MatSelectChange) {
    this.selectedFromValue = event.value;
    this.selectedToValue = null;
    this.toValue = 0;
    this.recalculate('from');
  }

  public changeToCurrency(event: MatSelectChange) {
    this.selectedToValue = event.value;
    this.recalculate('to');
  }

  public getFromOptions() {
    if (!this.currencyMap) {
      return [];
    }

    return Object.keys(this.currencyMap);
  }

  public getToOptions() {
    if (!this.currencyMap || !this.selectedFromValue) {
      return [];
    }
    return Object.keys(this.currencyMap[this.selectedFromValue]);
  }

  private recalculate(type: Direction) {
    if (!this.currencyMap || !this.selectedFromValue || !this.selectedToValue) {
      return;
    }

    if (type === 'to') {
      this.toValue = +(
        this.fromValue *
        this.currencyMap[this.selectedFromValue][this.selectedToValue]
      ).toFixed(2);
    } else {
      this.fromValue = +(
        this.toValue /
        this.currencyMap[this.selectedFromValue][this.selectedToValue]
      ).toFixed(2);
    }
  }

  public getCurrencyMap() {
    this.subscription = this.currencyService
      .getCurrencyMap()
      .subscribe((data) => {
        this.currencyMap = data;
      });
  }
}
