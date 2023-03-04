import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterData(data: any[], searchTerm: string, searchKey: string): any[] {
    if (!data || !searchTerm) {
      return data;
    }
    
    searchTerm = searchTerm.toLowerCase();

    return data.filter(item => {
      let value: string = item[searchKey];
      if (!value) {
        return false;
      }
      value = value.toLowerCase();
      return value.includes(searchTerm);
    });
  }

}

