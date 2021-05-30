import { AccountStatmentRoutingModule } from "./account-statment-routing.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountStatmentComponent } from "./container/account-statment/account-statment.component";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AccountStatmentComponent],
  imports: [
    CommonModule,
    AccountStatmentRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    SharedModule,
  ],
})
export class AccountStatmentModule {}
