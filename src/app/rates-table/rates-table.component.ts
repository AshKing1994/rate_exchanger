import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RateService } from '../services/rates/rate.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface rateData {
  id;
  name;
  rate;
}
@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.css'],
  providers: [DatePipe]
})

export class RatesTableComponent implements OnInit {
  today: any;
  yesterday: any;
  serviceData: any;
  convertCurrency=[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'rates'];
  dataSource: MatTableDataSource<rateData>;
  constructor(private datePipe: DatePipe, private rates: RateService) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.yesterday = this.datePipe.transform(new Date(new Date().setDate(new Date().getDate() - 2)), 'yyyy-MM-dd');
  }


  ngOnInit() {
    this.serviceData = { start_at: this.yesterday, end_at: this.today };

    this.rates.getHistory(this.serviceData).subscribe((data: any) => {
      Object.keys(data.rates[this.yesterday]).forEach((element,index) => {
        index++;
        this.convertCurrency.push({ id: index, name: element, rate: data.rates[this.yesterday][element] });
        
      });
      this.dataSource = new MatTableDataSource(this.convertCurrency);
      this.dataSource.paginator = this.paginator;
    });
  }
}


