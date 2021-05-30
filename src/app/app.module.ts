import { LoginComponent } from "./views/products/component/product/login/login.component";
import { InvoiceService } from "./views/invoice/services/invoice.service";
import { InventoryService } from "./views/inventory/services/inventory.service";
import { SharedService } from "./shared/services/shared.service";
import { NgMaterialModule } from "./views/ng-material/ng-material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";

import {
  IconModule,
  IconSetModule,
  IconSetService,
} from "@coreui/icons-angular";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { MdbModule } from "mdb-angular-ui-kit";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountStatmentService } from "./views/account-statment/service/account-statment.service";
import { CategoryService } from "./shared/services/product/product.service";
import { ItemService } from "./shared/services/item/item.service";
import { ShoppingCartService } from "./shared/services/shopping.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SalesService } from "./views/sales/services/sales.service";
import { AuthService } from "./shared/services/auth.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    NgMaterialModule,
    IconSetModule.forRoot(),
    MdbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
  ],
  declarations: [AppComponent, LoginComponent, ...APP_CONTAINERS],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    AccountStatmentService,
    SharedService,
    InventoryService,
    CategoryService,
    ItemService,
    ShoppingCartService,
    InvoiceService,
    SalesService,
    AuthService,
  ],
  bootstrap: [AppComponent],
  exports: [LoginComponent],
})
export class AppModule {}
