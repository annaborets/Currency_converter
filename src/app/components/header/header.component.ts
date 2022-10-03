import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import {
  CurrencyConvService,
  CurrencyMap,
} from 'src/app/services/currency-conv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currencyList: Response = [];
  public filteredCurrency: Response = [];
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private currencyService: CurrencyConvService) {}

  ngOnInit(): void {
    this.getCurrencies();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getCurrencies() {
    this.subscription = this.currencyService
      .getCurrencyList()
      .subscribe((data) => {
        this.currencyList = data;
        this.filterData();
      });
  }

  public filterData() {
    this.filteredCurrency = [
      ...this.currencyList.filter((item) => item.ccy !== 'BTC'),
    ];
  }
}
