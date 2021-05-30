import { maincompnonet } from './main.component';
import { productcompnonet } from './component/product/product.component';
 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartCompnonet } from './component/product/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './component/product/order-success/order-success.component';
import { ShoppingCartMaterialCompnonet } from './component/product/shopping-cart-material/shopping-cart-material.component';
import { LoginComponent } from './component/product/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: maincompnonet,
    children: [
        {
            path: '',
            component: productcompnonet
        },
        {
          path: 'shopping-cart',
          component: ShoppingCartCompnonet
        },
        {
          path: 'shopping',
          component: ShoppingCartMaterialCompnonet
        },
        {
          path: 'ordersuccess',
          component: OrderSuccessComponent
        }, 
        {
          path: 'login',
          component: LoginComponent
        },
        // {
        //   path: 'extra',
        //   component: ProductNotesComponent
        // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
