import { Router } from "@angular/router";
import { AuthService } from "./../../shared/services/auth.service";
import { Component } from "@angular/core";
import { navItems } from "../../_nav";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logOut();
    this.router.navigate(["./products/login"]);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
