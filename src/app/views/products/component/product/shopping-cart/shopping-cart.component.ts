import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Item } from "../../../../../shared/model/item";
import { ShoppingCartService } from "../../../../../shared/services/shopping.service";

@Component({
  selector: "ShoppingCart",
  templateUrl: "shopping-cart.component.html",
  styleUrls: ["shopping-cart.component.scss"],
})
export class ShoppingCartCompnonet implements OnInit {
  items: Item[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      if (items.length <= 0) {
        this.router.navigate(["/products"]);
      }
      this.items = items.map((item) => {
        item.image = "data:image/png;base64," + item["pic_1"];
        return item;
      });
    });
  }

  clearCart() {
    this.shoppingCartService.clearProducts();
    this.router.navigate(["/products"]);
  }

  checkout()  {
    // call api use this.items
    // and use this line in sucess
    // console.log(this.items);
    this.shoppingCartService.saveItems(this.items).subscribe((response) => {});

    // this.router.navigate(["/products/ordersuccess"]);
    // this.shoppingCartService.clearProducts();
  }
}
