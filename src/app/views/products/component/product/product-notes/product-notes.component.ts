import { ShoppingCartService } from "./../../../../../shared/services/shopping.service";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { Item } from "../../../../../shared/model/item";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ItemService } from "../../../../../shared/services/item/item.service";
import { DialogData } from "../../../../../shared/model/dialogData";

@Component({
  selector: "product-notes",
  templateUrl: "product-notes.component.html",
  styleUrls: ["product-notes.component.scss"],
})
export class ProductNotesComponent {
  items: Item[];
  showActions: true;
  clicked: boolean = false;
  constructor(
    private shoppingService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit() {
    this.items = [];
    this.items = this.data.extraItem;
  }

  addToCartExtraItem(extraItem: Item) {
    this.shoppingService.updateExtraItems(this.data.item, extraItem, 1);
  }

  getQuantity(extraItem: Item) {
    return this.shoppingService.getExtraQuantity(this.data.item, extraItem);
  }
  getImageUrl(item: Item) {
    return item.image;
  }
}
