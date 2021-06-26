import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { AuthGuardService } from "./shared/services/auth-guard.service";

import { LoginComponent } from "./views/products/component/product/login/login.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
   
  {
    path: "products",
    loadChildren: () =>
      import("./views/products/products.module").then((m) => m.ProductsModule),
  },

  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "account-statment",
        pathMatch: "full",
        loadChildren: () =>
          import("./views/account-statment/account-statment.module").then(
            (m) => m.AccountStatmentModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: "inventory",
        pathMatch: "full",
        loadChildren: () =>
          import("./views/inventory/inventory-module").then(
            (m) => m.InventoryModule
          ),
        canActivate: [AuthGuardService],
      },

      {
        path: "invoice",
        pathMatch: "full",
        loadChildren: () =>
          import("./views/invoice/invoice-module").then((m) => m.InvoiceModule),
        canActivate: [AuthGuardService],
      },
      {
        path: "sales",
        pathMatch: "full",
        loadChildren: () =>
          import("./views/sales/sales-module").then((m) => m.SalesModule),
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
