import { FormsModule } from '@angular/forms';
import { MatSortModule } from "@angular/material/sort";
import { ProductNotesComponent } from "./component/product/product-notes/product-notes.component";
import { productcompnonet } from "./component/product/product.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsRoutingModule } from "./products.routing.module";
import { CategoryMenucompnonet } from "./component/product/menu/category-menu.component";
import { HeaderComponent } from "./component/header/header.component";
import { maincompnonet } from "./main.component";
import { ProductCartcompnonet } from "./component/product/product-cart/product-cart.component";
import { ProductQuantityComponent } from "./component/product/product-quantity/product-quantity.component";
import { ShoppingCartCompnonet } from "./component/product/shopping-cart/shopping-cart.component";
import { OrderSuccessComponent } from "./component/product/order-success/order-success.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { ShoppingCartMaterialCompnonet } from "./component/product/shopping-cart-material/shopping-cart-material.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { LoginComponent } from "./component/product/login/login.component";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CategoryMenucompnonet,
    maincompnonet,
    HeaderComponent,
    productcompnonet,
    ShoppingCartCompnonet,
    ProductQuantityComponent,
    ProductCartcompnonet,
    OrderSuccessComponent,
    ProductNotesComponent,
    ShoppingCartMaterialCompnonet  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    FormsModule 
  ],
  exports: [maincompnonet],
})
export class ProductsModule {}