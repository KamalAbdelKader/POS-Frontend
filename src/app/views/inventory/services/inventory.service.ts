import { TotalInventory } from './../models/total-inventory';
import { CoreUIIconsComponent } from './../../icons/coreui-icons.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../../../shared/services/shared.service';
import { Inventory } from '../models/Inventory';
import { DataService } from '../../../shared/services/base/data.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends DataService {
  private getAllUrl;
  private getTotalUrl;
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    super(httpClient);
    this.getAllUrl = this.url.inventory.getAll;
    this.getTotalUrl = this.url.inventory.getTotal;
  }
  GetAll(): Observable<Inventory[]> {
    return this.get<Inventory[]>(this.getAllUrl);
  }

  getTotal()
  {
    return this.get<TotalInventory[]>(this.getTotalUrl); 
  }
}
