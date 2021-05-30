import { ProductNotesComponent } from "./product-notes/product-notes.component";
import { Item } from "./../../../../shared/model/item";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../../../../shared/services/item/item.service";
import { ShoppingCartService } from "../../../../shared/services/shopping.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogData } from "../../../../shared/model/dialogData";

@Component({
  selector: "products",
  templateUrl: "product.component.html",
  styleUrls: ["product.component.scss"],
})
export class productcompnonet implements OnInit {
  items: Item[];
  extraItems: Item[];
  categoryId: string;
  clicked: boolean = false;

  constructor(
    private itemService: ItemService,
    public shoppingService: ShoppingCartService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.items = [];
    this.extraItems = [];
    this.clicked = false;
  }

  ngOnInit() {
    this.getItems();
    this.getExtraItems();
  }

  private getExtraItems() {
    this.itemService.getExtraItems().subscribe((response) => {
      this.extraItems = response;
    });
  }

  private getItems() {
    this.route.queryParams.subscribe(async (param) => {
      this.categoryId = param["category"] as string;
      if (this.categoryId && this.categoryId.length > 0) {
        this.items = await this.itemService
          .getItemsByCategoryGuid(this.categoryId)
          .toPromise();
      } else {
        this.items = await this.itemService.getAllitems().toPromise();
      }
    });
  }

  addToCart(item: Item) {
    this.shoppingService.updateItem(item, 1);
  }

  openDialog(item: Item) {
    const data: DialogData = { item, extraItem: this.extraItems };
    this.dialog.open(ProductNotesComponent, {
      data,
      width: "30%",
      height: "500px",
      position: { top: "100px" },
    });
  }

  getQuantity(item: Item) {
    return this.shoppingService.getQuantity(item);
  }
}
