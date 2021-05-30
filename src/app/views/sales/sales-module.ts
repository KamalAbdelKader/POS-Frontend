import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './containers/sales.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { InvoiceRoutingModule } from './sales.routing.module';

@NgModule({
  declarations: [SalesComponent],
  imports: [CommonModule, InvoiceRoutingModule, MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule],
})
export class SalesModule {}
