import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Category } from '../../account-statment/model/Category';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class DateFilterComponent implements OnInit {

  @Input('form') filterForm: FormGroup;
  @Input('categories') categories: Category[] = [];
  @Input('showCategory') showCategory: boolean = true;

  get fromDate() {
    return this.filterForm.get('fromDate')
  }

  get toDate() {
    return this.filterForm.get('toDate')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
