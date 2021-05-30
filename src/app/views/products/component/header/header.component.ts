import { ShoppingCartService } from './../../../../shared/services/shopping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  length = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getItems();
    this.shoppingCartService.currentItemsList
    .subscribe((items) => {
      this.length = items.length;
    });
  }

}
