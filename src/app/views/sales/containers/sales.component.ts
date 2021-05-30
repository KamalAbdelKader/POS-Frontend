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
import { IsNullOrEmptyString } from "../../../shared/helper/helper";

@Component({
  selector: "app-home-view-container",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit, AfterViewInit {
  totalDisplayedColums: string[] = [
    "quantity",
    "costValue",
    "saleValue",
    "profit",
  ];

  displayedColumns: string[] = [
    "name",
    "quantity",
    "costValue",
    "saleValue",
    "profit",
    "groupName",
  ];
  accountStatment$: any;
  categories: Category[] = [];
  dataSource: MatTableDataSource<Sales> = new MatTableDataSource([]);
  totalDataSource: MatTableDataSource<TotalSales> = new MatTableDataSource([]);
  form = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
    categoryName: new FormControl(""),
  });
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private invoiceService: SalesService,
    private categoService: CategoryService
  ) {}

  async ngOnInit() {
    await this.getAll();
    await this.getTotal();
    await this.getAllCategories();
    this.onStart();
  }

  async getAll() {
    const response = await this.invoiceService.getAll().toPromise();
    this.dataSource.data = response;
  }

  async getAllCategories() {
    this.categories = await this.categoService.getCategoryies().toPromise();
  }

  async getTotal() {
    this.totalDataSource.data = await this.invoiceService
      .getTotal()
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
      if ((fromDate && toDate) || !IsNullOrEmptyString(category)) {
        return this.getSelectedDate(date, fromDate, toDate, data, category);
      }

      return true;
    };
  }

  private getSelectedDate(
    date: Date,
    fromDate: any,
    toDate: any,
    data: Sales,
    category: any
  ): boolean {
    if (fromDate && toDate && !IsNullOrEmptyString(category)) {
      return date >= fromDate && date <= toDate && data.groupName == category;
    }

    if (fromDate && toDate) {
      return date >= fromDate && date <= toDate;
    }

    if (!IsNullOrEmptyString(category)) {
      return data.groupName == category;
    }
  }

  applyFilter() {
    this.dataSource.filter = "" + Math.random();
  }
}
