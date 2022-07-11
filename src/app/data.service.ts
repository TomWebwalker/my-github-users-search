import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiSearchParams, ApiSearchResponse } from './typings';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly searchParams: ApiSearchParams = {
    q: '',
  };
  source$: Observable<ApiSearchResponse>;
  readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly subject$ = new BehaviorSubject<any>(null);

  constructor(private readonly http: HttpClient) {
    this.source$ = this.subject$.pipe(
      filter(Boolean),
      tap(() => this.loading$.next(true)),
      switchMap((params) =>
        this.http.get<ApiSearchResponse>(
          `https://api.github.com/search/users`,
          {
            params: searchParamsToHttpParams(params),
          }
        )
      ),
      tap(() => this.loading$.next(false))
    );
  }

  searchByQuery(query: string): void {
    this.searchParams.q = query;
    this.subject$.next(this.searchParams);
  }

  paginate(event: PageEvent): void {
    this.searchParams.page = event.pageIndex + 1;
    this.searchParams.per_page = event.pageSize;
    this.subject$.next(this.searchParams);
  }
}

function searchParamsToHttpParams(searchParams: ApiSearchParams): HttpParams {
  let params = new HttpParams();
  Object.entries(searchParams)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => {
      params = params.append(key, value);
    });
  return params;
}
