import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiSearchResponseItem } from '../typings';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent {
  @Input() responseItems: ApiSearchResponseItem[] = [];
  @Input() responseTotal = 0;
  @Output() paginate = new EventEmitter<PageEvent>();

  readonly displayedColumns: Extract<keyof ApiSearchResponseItem, string>[] = [
    'avatar_url',
    'login',
    'html_url',
  ];

  paginationEventHandler(event: PageEvent): void {
    this.paginate.emit(event);
  }
}
