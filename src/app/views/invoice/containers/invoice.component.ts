import { TotalInvoice } from "./../models/invoice-total";
import { InvoiceService } from "../services/invoice.service";
import { ViewChild, AfterViewInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Invoice } from "../models/invoice";
import { FormControl, FormGroup } from "@angular/forms";

export interface PeriodicElement {
  name: string;
  expr1: number;
  store: string;
  group_Name: string;
  type_Iteme: string;
  avg_Price: number;
  endUser: number;
  unit2: string;
  qtY_Unit2: number;
  qtY2: number;
  latin_Name: string;
  company: string;
}

@Component({
  selector: "app-home-view-container",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  totalDisplayedColums: string[] = [
    "discount",
    "total",
    "deliveryCharge",
    "knet",
    "visa",
    "cash",
  ];

  displayedColumns: string[] = [
    // 'parent_Guid',
    "number",
    "date",
    "time_Bill",
    "disc",
    "p_Extra",
    "total",
    "kNet",
    "visa",
    "shift_No",
    // 'name',
    "cash",
  ];
  accountStatment$: any;

  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource([]);
  totalDataSource: MatTableDataSource<TotalInvoice> = new MatTableDataSource(
    []
  );
  form = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private invoiceService: InvoiceService) {}

  async ngOnInit() {
    await this.getAll();
    await this.getTotal();
    this.onStart();
  }

  async getAll() {
    this.dataSource.data = await this.invoiceService.GetAll().toPromise();
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
    this.dataSource.filterPredicate = (data: Invoice, filter: string) => {
      debugger;

      const fromDate = this.form.get("fromDate")?.value;
      const toDate = this.form.get("toDate")?.value;
      const date = new Date(data["date"]);
      console.log(data["date"]);
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
