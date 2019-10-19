import { Component, OnInit } from '@angular/core';
import { RateService } from '../services/rates/rate.service'
import { RatesTableComponent} from '../rates-table/rates-table.component'
import { Router  } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  baseCurrency: any;
  convertCurrency: any;
  rate = 1;
  currency: any;
  selectedCurrency = 'USD';
  serviceData: any;
  today:any;
  constructor(private rates: RateService,private router:Router ) { }

  ngOnInit() {
    this.baseCurrency = [{ value: 'USD', viewValue: 'USD' }];
    this.convertCurrency = [];

    this.rates.getRates().subscribe((data: any) => {
      this.today = data.date;
      this.baseCurrency = [{ value: data.base, viewValue: data.base }];
      Object.keys(data.rates).forEach(element => {
        this.convertCurrency.push({ value: element, viewValue: element, rate: data.rates[element] })
      });
    });

  }
  getExchangeRate(event) {
    console.log(event);
    this.rate = event.value.rate;
    this.currency = event.value.value;
  }
  renewRate(currency) {
    if(currency== undefined || currency==null)
    {
      currency = 'USD';
    }
    this.serviceData = { symbol: currency };
    this.rates.getRates(this.serviceData).subscribe((data:any) => {
      this.rate = data.rates[currency];
      this.currency = currency;
    });
  }
  logout() {
    this.router.navigate(['login']);
    }

}
