import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from './company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  url = '/assets/sp500.json';

  constructor(private http: HttpClient) {}

  getCompanys(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}