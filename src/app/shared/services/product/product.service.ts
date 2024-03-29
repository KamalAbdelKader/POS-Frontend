import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../../views/account-statment/model/Category";
import { DataService } from "../base/data.service";
import { SessionService } from '../session.service';

@Injectable({
  providedIn: "root",
})
export class CategoryService extends DataService {
  private categoryUrl: string;
  private categoryUrlByUserAccessUrl: string;
  constructor(http: HttpClient, private sessionService: SessionService) {
    super(http);
    this.categoryUrl = this.url.category.getAll
    this.categoryUrlByUserAccessUrl = this.url.category.categoryUrlByUserAccess
  }

  getCategoryies(): Observable<Category[]> {
    return this.get<Category[]>(this.categoryUrl);
  }

  getCategoryiesByUserAccess(): Observable<Category[]> {
    const userAccess = this.sessionService.getUser()?.userPin?.toString();
    return this.post<any>(this.categoryUrlByUserAccessUrl, { userAccess });
  }
}
