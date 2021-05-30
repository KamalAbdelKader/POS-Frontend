import { AccountStatment } from '../model/AccountStatment';
import { SharedService } from '../../../shared/services/shared.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountStatmentService {
  private API_URL = 'Api/AccountStatmentApi/GetAccountStatment';
  headers: HttpHeaders;
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  GetAll(): Observable<AccountStatment[]> {
    return this.httpClient.get<AccountStatment[]>(
      this.sharedService.configuration.hostName + this.API_URL, {
        headers: this.headers
      }
    );
  }
}
