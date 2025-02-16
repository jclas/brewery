import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  apiUrl = 'https://api.openbrewerydb.org/v1/breweries';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 
  constructor(private http: HttpClient) { 

  }

  //Works!
  getBreweryMetadata() {
   
    return this.http.get(this.apiUrl + '/meta?by_state=wisconsin', { "headers": this.headers });

  }
   
  //not tested yet
  getBreweries(page?:number, perPage?:number) {

    if (!page) {
      page = 1;
    }
    if (!perPage || perPage > 50) {
      perPage = 5;
    }
    let url = this.apiUrl + '?by_state=wisconsin&page=' + page + '&per_page=' + perPage;
  
    return this.http.get(url, { "headers": this.headers });
  }
}

