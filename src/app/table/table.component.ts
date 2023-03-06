import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SortColumn, SortDirection, SortService } from '../sort.service';
import { CommonModule } from '@angular/common';


function search(text: string, companies: Company[]): Company[] {
  return companies.filter((company) => {
    const term = text.toLowerCase();
    return (
      company.symbol.toLowerCase().includes(term) ||
      company.name.toLowerCase().includes(term) ||
      company.sector.toLowerCase().includes(term) ||
      company.industry.toLowerCase().includes(term) ||
      company.location.toLowerCase().includes(term)
    );
  });
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    DecimalPipe,
    NgFor,
    AsyncPipe,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [DecimalPipe],
})
export class TableComponent {
  companies$!: Observable<Company[]>;
  originalCompanies: Company[] = [];

  filter = new FormControl();

  public currentSortColumn: SortColumn = '';
  public currentSortDirection: SortDirection = '';

  constructor(
    private companyService: CompanyService,
    private sortService: SortService
  ) {
    this.companyService.getCompanys().subscribe((companies) => {
      this.originalCompanies = companies;
      this.companies$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => search(text, companies))
      );
    });
  }
  onSort(column: SortColumn) {
    if (column === this.currentSortColumn) {
      this.currentSortDirection = this.sortService.rotate(
        this.currentSortDirection
      );
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }

    const multiplier = this.currentSortDirection === 'asc' ? 1 : -1;

    this.originalCompanies.sort((a, b) => {
      if (
        a[this.currentSortColumn as keyof Company] <
        b[this.currentSortColumn as keyof Company]
      ) {
        return -1 * multiplier;
      } else if (
        a[this.currentSortColumn as keyof Company] >
        b[this.currentSortColumn as keyof Company]
      ) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });

    this.companies$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(text, this.originalCompanies))
    );
  }
}
