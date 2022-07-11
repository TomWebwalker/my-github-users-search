import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pluck,
  shareReplay,
  Subject,
  takeUntil,
} from 'rxjs';
import { DataService } from './data.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-github-users-search';
  readonly form = this.formBuilder.group({
    search: [''],
  });
  private readonly stream$ = this.dataService.source$.pipe(shareReplay());
  readonly loading$ = this.dataService.loading$;
  readonly list$ = this.stream$.pipe(pluck('items'));
  readonly total$ = this.stream$.pipe(pluck('total_count'));
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.form
      .get('search')!
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((value) => this.dataService.searchByQuery(value));
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  paginateHandler(event: PageEvent): void {
    this.dataService.paginate(event);
  }
}
