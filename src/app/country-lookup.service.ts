import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


// Step G2. Sets object to receive JSON information
// Shape of one country object (index 1, element 0 of the API response)
export interface CountryDetails {
  id: string;
  iso2Code:string;
  name: string;
  region: { id: string; iso2code: string; value: string };
  adminregion: { id: string; iso2code: string; value: string };
  incomeLevel: { id: string; iso2code: string; value: string };
  lendingType: { id: string; iso2code: string; value: string };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

// The World Bank returns a two-element array: [paging info, [countries]]
export type CountryResponse = [
  { page: number; pages: number; per_page: string; total: number },
  CountryDetails[]
];

@Injectable({
  providedIn: 'root'
})
export class CountryLookupService {
  private endpoint: string = "https://api.worldbank.org/v2/country/";
  private queryString: string = "?format=json";

  constructor(private http: HttpClient) { }
  // This constructor creates an instance of the HttpClient class called http. We can work with this instance to call
  // the get/request method

  getCountryData(countryCode:string): Observable<CountryResponse> {
    const url: string = this.endpoint + countryCode + this.queryString;
    // Step G1. Country code is used in the http request
    // return your dynamic API call here
    return this.http.get<CountryResponse>(url);

  }
}
