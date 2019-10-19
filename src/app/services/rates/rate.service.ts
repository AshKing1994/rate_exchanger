import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RateService {
  symbol: any;
  dates:any;
  constructor(private http: HttpClient) { }

  getRates(data: any = {}) {
//  console.log(data.symbol);
    if (data.symbol) {
      this.symbol = '&symbols=USD,' + data.symbol;
    } else {
      this.symbol = '';
    }
    return this.http.get(environment.baseUrl+'latest?base=USD'+this.symbol);
  }
  getHistory(data: any = {})
  {
    if (data.start_at && data.end_at) {
      this.dates = 'start_at=' + data.start_at +'&end_at='+data.end_at+'&base=USD' ;
    } else {
      this.dates = '';
    }
    return this.http.get(environment.baseUrl+'history?'+this.dates);
  }
}
