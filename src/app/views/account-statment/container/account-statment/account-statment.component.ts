import { AccountStatment } from "./../../model/AccountStatment";
import { AccountStatmentService } from "../../service/account-statment.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { AfterViewInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-list-view-container",
  templateUrl: "./account-statment.component.html",
  styleUrls: ["./account-statment.component.scss"],
})
export class AccountStatmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "datE_DAY1",
    "notE_DAY1",
    "reference",
    "debiT_DAY2",
    "crediT_DAY2",
  ];
  accountStatment$: any;

  dataSource: MatTableDataSource<AccountStatment> = new MatTableDataSource([]);
  form = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountStatment: AccountStatmentService) {}

  async ngOnInit() {
    await this.getAll();
    this.onStart();
  }

  async getAll() {
    const response = await this.accountStatment.GetAll().toPromise();
    this.dataSource.data = response;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onStart() {
    this.dataSource.filterPredicate = (
      data: AccountStatment,
      filter: string
    ) => {
      debugger;
      const fromDate = this.form.get("fromDate")?.value;
      const toDate = this.form.get("toDate")?.value;
      const date = new Date(data["datE_DAY1"]);
      console.log(data["datE_DAY1"]);
      if (fromDate && toDate) {
        return date >= fromDate && date <= toDate;
      }

      return true;
    };
  }

  applyFilter() {
    this.dataSource.filter = "" + Math.random();
  }
}
