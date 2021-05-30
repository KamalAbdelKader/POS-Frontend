import { InventoryRoutingModule } from './inventory.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './containers/inventory.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, InventoryRoutingModule, MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule]
})
export class InventoryModule {}
