import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../../views/account-statment/model/Category";
import { DataService } from "../base/data.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends DataService {
  private categoryUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.categoryUrl = this.url.category.getAll
  }

  getCategoryies(): Observable<Category[]> {
    return this.get<Category[]>(this.categoryUrl);
  }
}
