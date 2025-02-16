import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brewery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brewery.component.html',
  styleUrl: './brewery.component.css'
})
export class BreweryComponent {
  @Input() brewery: any;
  @Input() breweryTypeString: any;

  constructor() {

  }

  getBreweryAddress() {

    let address = ((this.brewery.address_1 || '') + ' ' + (this.brewery.address_2 || '') + ' ' + (this.brewery.address_3 || '')).trim() + ' ' ;
    address += this.brewery.city ? this.brewery.city + ', ' : '';
    address += (this.brewery.state_province || '') + ' ' + (this.brewery.country || '');
    address = address.trim();

    return address;
  }
}
