import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreweryListComponent } from "./brewery-list/brewery-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreweryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'Wisconsin Breweries';
}
