import { Component, Input } from "@angular/core";
import { ObjectHasValue } from "../../../../../shared/helper/helper";
import { Item } from "../../../../../shared/model/item";
import { ShoppingCartService } from "../../../../../shared/services/shopping.service";

@Component({
  selector: "product-quantity",
  templateUrl: "product-quantity.component.html",
  styleUrls: ["product-quantity.component.scss"],
})
export class ProductQuantityComponent {
  @Input("item") item: Item;
  @Input("extraItem") extraItem: Item;

  constructor(private shoppingService: ShoppingCartService) {}

  addToCart() {
    if (this.extraItem && ObjectHasValue(this.extraItem)) {
      this.shoppingService.updateExtraItems(this.item, this.extraItem, 1);
    } else {
      this.shoppingService.updateItem(this.item, 1);
    }
  }

  removeFromCart() {
    if (this.extraItem && ObjectHasValue(this.extraItem)) {
      this.shoppingService.updateExtraItems(this.item, this.extraItem, -1);
    } else {
      this.shoppingService.updateItem(this.item, -1);
    }
  }

  getQuantity() {
    if (this.extraItem && ObjectHasValue(this.extraItem)) {
      return this.shoppingService.getExtraQuantity(this.item, this.extraItem);
    }
    return this.shoppingService.getQuantity(this.item);
  }
}
