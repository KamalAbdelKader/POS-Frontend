import { Injectable } from "@angular/core";
import { IsNullOrEmptyString } from "../helper/helper";
import { User } from "../model/user";
import { EncrDecrService } from "./encrDecrService.service";

/** This service for handling local-storage variable
 * as encrapted and decrpted
 */
@Injectable({
  providedIn: "root",
})
export class SessionService {
  private readonly _products = "p___k";
  private readonly _dateTime = "p___d";
  private readonly _user = "p___ur";

  constructor(private encrDecrService: EncrDecrService) {}

  setProducts(value: string): void {
    this.setValue(this._products, value);
  }

  getProducts(): string {
    return this.getValue(this._products);
  }

  setTime(arg0: Date) {
    const val = arg0.getDay().toString();
    this.setValue(this._dateTime, val);
  }

  getTime(): string {
    return this.getValue(this._dateTime);
  }

  setUser(user: User) {
    if (user) {
      const _user = JSON.stringify(user);
      this.setValue(this._user, _user);
    }
  }

  getUser(): User {
    const sUser = this.getValue(this._user);
    const _user = JSON.parse(sUser) as User;
    return _user;
  }

  clearUserData() {
    localStorage.removeItem(this._dateTime);
    localStorage.removeItem(this._user);
  }

  clearProducts(): void {
    localStorage.removeItem(this._products);
  }

  clearAll(): void {
    localStorage.clear();
  }

  private setValue(key: string, value: string): void {
    switch (key) {
      case this._products:
        this.setlocalValue(this._products, value);
        break;
      case this._dateTime:
        this.setlocalValue(this._dateTime, value);
        break;
      case this._user:
        this.setlocalValue(this._user, value);
        break;
      default:
        break;
    }
  }

  private setlocalValue(key: string, value: string): void {
    if (!IsNullOrEmptyString(value)) {
      const encrpty = this.encrDecrService.set(value);
      localStorage.setItem(key, encrpty);
    }
  }

  private getValue(key: string): string {
    const val = localStorage.getItem(key);
    if (val && !IsNullOrEmptyString(val)) {
      return this.encrDecrService.get(val);
    }

    return "";
  }
}
