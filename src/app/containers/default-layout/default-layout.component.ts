import { SessionService } from "./../../shared/services/session.service";
import { Router } from "@angular/router";
import { AuthService } from "./../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { getNavItems, navItems } from "../../_nav";
import { CloneObject, ObjectHasValue } from "../../shared/helper/helper";
import { userType } from "../../shared/model/userMangerEnum";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  userType = userType;
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.navItems = CloneObject(navItems);
    if (this.authService.isLogin()) {
      const user = this.sessionService.getUser();
      if (ObjectHasValue(user)) {
        const keys = Object.keys(this.userType)
        keys.forEach((key) => {
          if(user.userType == key) {
            const items = getNavItems();
            this.navItems.push(...items);
          }
        })

      }
    }
  }
  logout() {
    this.authService.logOut();
    this.navItems = [];
    this.router.navigate(["./"]);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
