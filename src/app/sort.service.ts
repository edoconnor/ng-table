import { Injectable } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company';

export type SortColumn = keyof Company | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Injectable({
  providedIn: 'root',
})

export class SortService {
  private companies!: Company[];

  constructor(private companyService: CompanyService) {
    this.companyService.getCompanys().subscribe((companies) => {
      this.companies = companies;
    });
  }

  sort(column: SortColumn, direction: SortDirection): Company[] {
    if (direction === '' || column === '') {
      return this.companies;
    } else {
      return [...this.companies].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  rotate(direction: SortDirection): SortDirection {
    return rotate[direction];
  }
}
