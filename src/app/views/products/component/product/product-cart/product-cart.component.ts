import { Component, Input, OnInit } from "@angular/core";
import { Item } from "../../../../../shared/model/item";
import { getImageUrl } from "../../../../../shared/image";

@Component({
  selector: "ProductCart",
  templateUrl: "product-cart.component.html",
  styleUrls: ["product-cart.component.scss"],
})
export class ProductCartcompnonet implements OnInit {
  category$: any;

  @Input("item") item: Item;
  imageUrl: string | ArrayBuffer = "";
  constructor() {}

  ngOnInit(): void {
    this.imageUrl = "data:image/png;base64," + this.item["pic_1"];
  }


  get_ImageUrl(item: Item) {
    return getImageUrl(item);
  }
}
