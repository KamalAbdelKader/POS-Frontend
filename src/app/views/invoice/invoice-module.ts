import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvoiceComponent } from "./containers/invoice.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { InvoiceRoutingModule } from "./invoice.routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    SharedModule,
  ],
})
export class InvoiceModule {}
