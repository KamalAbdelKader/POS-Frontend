import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../../shared/services/base/data.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Sales } from '../models/sales';
import { TotalSales } from '../models/total-sales';
  
@Injectable({
  providedIn: 'root'
})
export class SalesService extends DataService {
  private getAllUrl;
  private getTotalUrl;
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    super(httpClient);
    this.getAllUrl = this.url.sales.getAll;
    this.getTotalUrl = this.url.sales.getTotal;
  }
  
  getAll(): Observable<Sales[]> {
    return this.get<Sales[]>(this.getAllUrl);
  }

  getTotal(): Observable<TotalSales[]> {
    return this.get<TotalSales[]>(this.getTotalUrl);
  }
}
