import { Component } from '@angular/core';
import { BreweryService } from '../brewery.service';
import { CommonModule } from '@angular/common';
import { BreweryComponent } from "../brewery/brewery.component";

@Component({
  selector: 'app-brewery-list',
  standalone: true,
  imports: [CommonModule, BreweryComponent],
  templateUrl: './brewery-list.component.html',
  styleUrl: './brewery-list.component.css'
})
export class BreweryListComponent {
  breweryTypes = new Map();
  page = 1;
  perPage = 20;
  breweries: any[] = [];
  totalCount = 0;
  errorMessageDisplay = "";

  constructor(private breweryService: BreweryService) {
    this.breweryTypes.set('micro', 'Most craft breweries are considered micro breweries');
    this.breweryTypes.set('nano', 'An extremely small brewery which typically only distributes locally');
    this.breweryTypes.set('regional', 'A regional location of an expanded brewery');
    this.breweryTypes.set('brewpub', 'A beer-focused restaurant or restaurant/bar with a brewery on-premise');
    this.breweryTypes.set('large', 'A very large brewery');
    this.breweryTypes.set('planning', 'A brewery in planning or not yet opened to the public.');
    this.breweryTypes.set('bar', 'No brewery equipment on premise.');
    this.breweryTypes.set('contract', 'A brewery that uses another brewery’s equipment.');
    this.breweryTypes.set('proprietor', 'Alternative, non-traditional brewery business.');
    this.breweryTypes.set('closed', 'not in business'); 


    this.breweryService.getBreweryMetadata()
    .subscribe({
      next: (response) => {
        this.totalCount =  JSON.parse(JSON.stringify(response)).total;
        console.log('this.totalCount: ' + this.totalCount);

        this.getBreweries(); //load the first page of data
      },
      error: (err) => {
        console.log(err);
        this.errorMessageDisplay = "Can't load page at this time. Open Brewery DB API is currently not available.";
      },
      complete: () => console.log('Done retrieving metadata')
    });
  }

  async getBreweries() {
    console.log('this.page: ' + this.page);

    this.breweryService.getBreweries(this.page, this.perPage).subscribe({
        next: (response2) => {
          this.breweries = this.breweries.concat(response2);

          if (this.page * this.perPage < this.totalCount ) {
            document.addEventListener('scroll', (event) => this.infinityScroll(event));
          }
        },
        complete: () => console.log(`Done retrieving page ${this.page} breweries.`)
      });

    console.log('this.getBreweries()');
  }

  async infinityScroll(e: Event) {

    e.stopImmediatePropagation(); //stops any remaining listeners after the current one.

    var element = document.querySelector("#brewery-list")?.lastElementChild;
    
    if (!element) return;

    let rect = element.getBoundingClientRect();
    let isAtBottom = rect.bottom <= window.innerHeight; // && (rect.top + rect.height >= 0);

    if (!isAtBottom) return;

    //We're at the end of the page. Get more!
    console.log('@ bottom');

	  if (this.page * this.perPage < this.totalCount) {
      this.page++; //set it to get the next page of data
      await this.getBreweries();
    }
    else {
      console.log('No API call: All data has been retrieved already.');
    }
  }  
}
