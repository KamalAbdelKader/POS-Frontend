import { CategoryService } from "./../../../shared/services/product/product.service";
import { TotalInventory } from "./../models/total-inventory";
import { InventoryService } from "./../services/inventory.service";
import { Inventory } from "./../models/Inventory";
import { ViewChild, AfterViewInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Category } from "../../account-statment/model/Category";
import { CloneObject } from "../../../shared/helper/helper";

export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: "app-home-view-container",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];
  displayedColumns: string[] = [
    "barcode1",
    "name",
    "expr1",
    "store",
    "avgPrice",
    "endUser",
    "saleValue",
    "costValue",
    "groupName",
  ];
  accountStatment$: any;
  groupName = "";
  dataSource: MatTableDataSource<Inventory> = new MatTableDataSource([]);
  sourceData: Inventory[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  get totalSaleValue() {
    return this.getTotal("saleValue");
  }

  get totalEndUser() {
    return this.getTotal("endUser");
  }

  get avgPriceValue() {
    return this.getTotal("avgPrice");
  }

  get totalCostValue() {
    return this.getTotal("costValue");
  }

  get totalexpr1() {
    return this.getTotal("expr1");
  }

  get inventoryList(): any[] {
    return this.dataSource.data;
  }

  constructor(
    private inventoryService: InventoryService,
    private categoService: CategoryService
  ) {}

  async ngOnInit() {
    await this.getAllCategories();
  }

  async getAllCategories() {
    this.groupName = "";
    this.categories = await this.categoService
      .getCategoryiesByUserAccess()
      .toPromise();

    if (this.categories && this.categories.length > 0) {
      await this.getAll();
      this.groupName = this.categories[0].name;
      this.onCategoryChange(this.categories[0].name);
    }
  }

  async getAll() {
    const response = await this.inventoryService.GetAll().toPromise();
    this.dataSource.data = response.filter(
      (item: any) => item.groupName == this.groupName
    );
    this.sourceData = CloneObject(response);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCategoryChange(value: string) {
    const data = CloneObject(this.sourceData) as any;
    this.groupName = value;
    if (value) {
      this.dataSource.data = data.filter((cat) => cat.groupName == value);
    } else {
      this.dataSource.data = [];
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getTotal(propName: string) {
    return this.inventoryList
      .map((items) => items[propName])
      .reduce((prev, curr) => prev + curr, 0);
  }
}
