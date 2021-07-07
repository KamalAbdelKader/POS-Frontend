import { Category } from "./../../account-statment/model/Category";
import { CategoryService } from "./../../../shared/services/product/product.service";
import { TotalSales } from "./../models/total-sales";
import { SalesService } from "../services/sales.service";
import { ViewChild, AfterViewInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Sales } from "../models/sales";
import { FormGroup, FormControl } from "@angular/forms";
import {
  CloneObject,
  IsNullOrEmptyString,
} from "../../../shared/helper/helper";

@Component({
  selector: "app-home-view-container",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "name",
    "quantity",
    "costValue",
    "saleValue",
    "profit",
    "groupName",
    "date"
  ];
  accountStatment$: any;
  categories: Category[] = [];
  dataSource: MatTableDataSource<Sales> = new MatTableDataSource([]);
  form = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
    categoryName: new FormControl(""),
  });

  get salesList(): Sales[] {
    return this.getSalesList();
  }

  get totalQuatity() {
    return this.getTotal("quantity");
  }

  get totalProfit() {
    return this.getTotal("profit");
  }

  get totalSalesValue() {
    return this.getTotal("saleValue");
  }

  get totalCostValue() {
    return this.getTotal("costValue");
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private salesService: SalesService,
    private categoService: CategoryService
  ) {}

  async ngOnInit() {
    this.onStart();
    await this.getAllCategories();
    await this.getAll();
  }

  async getAll() { 
    if (this.categories && this.categories.length > 0) {
      const response = await this.salesService.getAll().toPromise();
      this.dataSource.data = response;
      this.form.get("categoryName")?.setValue(this.categories[0].name);
      this.applyFilter();
    } else {
      this.dataSource.data = [];
    }
  }

  async getAllCategories() {
    this.categories = await this.categoService
      .getCategoryiesByUserAccess()
      .toPromise();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onStart() {
    this.dataSource.filterPredicate = (data: Sales, filter: string) => {
      const fromDate = this.form.get("fromDate")?.value;
      const toDate = this.form.get("toDate")?.value;
      const category = this.form.get("categoryName")?.value;
      const date = new Date(data["date"]);
      return this.getSelectedDate(date, fromDate, toDate, data, category);
    };
  }

  private getSelectedDate(
    date: Date,
    fromDate: any,
    toDate: any,
    data: Sales,
    category: any
  ): boolean {
    if (fromDate && toDate && !IsNullOrEmptyString(category) && category) {
      return date >= fromDate && date <= toDate && data.groupName == category;
    }

    if (fromDate && toDate && category) {
      return date >= fromDate && date <= toDate;
    }

    return data.groupName == category;
  }

  applyFilter() {
    
    this.dataSource.filter = "" + Math.random();

  }

  getSalesList(): Sales[] {
    const salesList = this.dataSource.filteredData as Sales[];
    return salesList;
  }

  private getTotal(propName: string) {
    return this.salesList
      .map((items) => items[propName])
      .reduce((prev, curr) => prev + curr, 0);
  }
}
