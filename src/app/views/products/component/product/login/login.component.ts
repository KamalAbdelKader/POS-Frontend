import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IsNullOrEmptyString } from "../../../../../shared/helper/helper";
import { AuthService } from "../../../../../shared/services/auth.service";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"],
})
export class LoginComponent implements OnInit {
  userNumber: string;
  error = "";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.error = "";
    if (IsNullOrEmptyString(this.userNumber)) {
      this.error = "Pin is required";
      return;
    }
    // call api
    // when you finish the api
    this.authService.login(this.userNumber).subscribe((reponse) => {
      debugger; 
      this.authService.onLoginChange(reponse);
      const isLogin = this.authService.isLogin();
      if (!isLogin) {
        this.error = "Wrong Pin";
        return;
      } else {
        this.router.navigate(["./account-statment"]);
      } 
    });

    // // this for demo
    // const respone = this.authService.demoLogin(this.userNumber);
    // this.authService.onLoginChange(respone);
    // const isLogin = this.authService.isLogin();
    // if (!isLogin) {
    //   this.error = "Wrong Pin";
    //   return;
    // } else {
    //   this.router.navigate(["./account-statment"]);
    // }

    // check reponse
  }
}
