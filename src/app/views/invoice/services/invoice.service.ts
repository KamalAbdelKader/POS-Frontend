import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../../shared/services/base/data.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Invoice } from '../models/invoice';
import { TotalInvoice } from '../models/invoice-total';
  
@Injectable({
  providedIn: 'root'
})
export class InvoiceService  extends DataService{
  private getAllUrl;
  private totalInvoiceUrl;
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    super(httpClient);
    this.getAllUrl = this.url.invoice.getAll;
    this.totalInvoiceUrl = this.url.invoice.getTotal;
  }
  GetAll(): Observable<Invoice[]> {
     return this.get<Invoice[]>(this.getAllUrl);
  }

  getTotal() : Observable<TotalInvoice[]>{
  return this.get<TotalInvoice[]>(this.totalInvoiceUrl);
  }

}
