import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from "./containers/sales.component";

const routes: Routes = [
  {
    path: "",
    component: SalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModule],
})
export class InvoiceRoutingModule {}
