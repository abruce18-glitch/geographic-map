import { Component, OnInit } from '@angular/core';
import {CountryLookupService, CountryDetails, CountryResponse} from '../country-lookup.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit{
  // Whole country object from the API response
  countryDetails: CountryDetails | undefined;

  // Individual values used by {{ }} in the template
  countryName: string | undefined;
  countryCapital:string | undefined;
  countryRegion: string | undefined;
  countryIncomeLevel: string | undefined;
  longitude: string | undefined;
  latitude: string | undefined;

  constructor(private countryService: CountryLookupService) {}

  getCountry(event: any):void {
    const target = event.target as SVGElement;
    const id: string = target.id;
    // Removes fill on all paths
    const svg = document.getElementsByTagName("svg")[0];
    for (let i=0; i<svg.children.length; i++) {
      let path = svg.querySelectorAll("path")[i];
      path.setAttribute("fill", "");
    }
    // Fills path color only on paths, not on ocean
    if (event.target.id) {
      target.setAttribute("fill", "oklch(63.32% 0.24 31.68)");
    }

    // Ask the service for this country and subscribe to the result
    this.countryService.getCountryData(id).subscribe((data: CountryResponse) => {
      // Step 1: assign the API response to an object in the app.
      this.countryDetails = data[1][0];
      // Step 2: pull each attribute off that object into the fields the template interpolates
      this.countryName = this.countryDetails.name;
      this.countryCapital = this.countryDetails.capitalCity;
      this.countryRegion = this.countryDetails.region.value;
      this.countryIncomeLevel = this.countryDetails.incomeLevel.value;
      this.longitude = this.countryDetails.longitude;
      this.latitude = this.countryDetails.latitude;
    });
  }

  ngOnInit(): void {  }
}
