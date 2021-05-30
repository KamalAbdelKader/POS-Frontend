import { CategoryService } from '../../../../../shared/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
  
@Component({
  selector: 'app-category',
  templateUrl: 'category-menu.component.html',
  styleUrls: ['category-menu.component.scss'],
})
export class CategoryMenucompnonet implements OnInit {
  category$: any;
  @Input("category") category: string;

  constructor(private categoryService: CategoryService) {}
 
 
  ngOnInit(): void {
    this.category$ =  this.categoryService.getCategoryies();
  }

  
}
