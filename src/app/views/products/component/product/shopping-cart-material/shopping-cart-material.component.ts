import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Item } from "../../../../../shared/model/item";
import { ShoppingCartService } from "../../../../../shared/services/shopping.service";

@Component({
  selector: "shopping-cart-material",
  templateUrl: "shopping-cart-material.component.html",
  styleUrls: ["shopping-cart-material.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ShoppingCartMaterialCompnonet implements OnInit, AfterViewInit {
  displayedColumns = ["name", "quantity", "endUser", "productTotal", "action"];
  dataSource: MatTableDataSource<Item>;

  @ViewChild("MatPaginator", { static: false }) paginator: MatPaginator;
  // @ViewChild("sort", { static: false }) sort: MatSort;

  expandedElement: any;
  items: Item[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      if (items.length <= 0) {
        this.router.navigate(["/products"]);
      }

      this.items = this.dataSource.data = items.map((item) => {
        item.image = "data:image/png;base64," + item["pic_1"];
        item['productTotal'] = this.shoppingCartService.getProductTotal(item);
        return item;
      });
    });
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  clearCart() {
    this.shoppingCartService.clearProducts();
    this.router.navigate(["/products"]);
  }

  checkout() {
    // call api use this.items
    // and use this line in sucess
    console.log(this.items);
    this.shoppingCartService.saveItems(this.items).subscribe((response) => {});

    // this.router.navigate(["/products/ordersuccess"]);
    // this.shoppingCartService.clearProducts();
  }
}
