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
  totalDisplayedColums: string[] = [
    "quantity",
    "costPrice",
    "salePrice",
    "saleValue",
    "costValue",
  ];

  displayedColumns: string[] = [
    "barcode1",
    "name",
    "expr1",
    "store",
    "avgPrice",
    "endUser",
    "saleValue",
    "costValue",
    "groupName"
  ];
  accountStatment$: any;

  dataSource: MatTableDataSource<Inventory> = new MatTableDataSource([]);
  sourceData: Inventory[] = [];
  totalDataSource: MatTableDataSource<TotalInventory> = new MatTableDataSource(
    []
  );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private inventoryService: InventoryService,
    private categoService: CategoryService
  ) {}

  async ngOnInit() {
    await this.getAll();
    await this.getTotal();
    await this.getAllCategories();
  }

  async getAllCategories() {
    this.categories = await this.categoService.getCategoryies().toPromise();
  }

  async getAll() {
    const response = await this.inventoryService.GetAll().toPromise();
    this.dataSource.data = response;
    this.sourceData = CloneObject(response);
  }

  async getTotal() {
    this.totalDataSource.data = await this.inventoryService
      .getTotal()
      .toPromise();
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

  onCategoryChange(event: Event) {
    const categoryName = (event.target as HTMLInputElement).value;
    const data = CloneObject(this.sourceData) as any;
    if(categoryName) {
      this.dataSource.data = data.filter((cat) => cat.groupName == categoryName);
    } else {
      this.dataSource.data = data;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
