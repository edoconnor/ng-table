import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

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
	imports: [DecimalPipe, NgFor, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule],
	templateUrl: './table.component.html',
  	styleUrls: ['./table.component.css'],
	providers: [DecimalPipe],
})

export class TableComponent {
	companies$: Observable<Company[]>;
	filter = new FormControl('', { nonNullable: true });	  
  
	constructor(private companyService: CompanyService, private pipe: DecimalPipe) {
	  this.companies$ = this.filter.valueChanges.pipe(
		startWith(''),
		map((text) => search(text, [])),
	  );
  
	  this.companyService.getCompanys().subscribe((companies) => {
		this.companies$ = this.filter.valueChanges.pipe(
		  startWith(''),
		  map((text) => search(text, companies)),
		);
	  });
	}
  }
