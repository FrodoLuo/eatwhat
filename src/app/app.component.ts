import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';
import { IRestaurant, RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private restaurantService: RestaurantService
  ) { }
  title = 'eatwhat';

  public restaurants$ = this.restaurantService.restaurants$;

  public result$ = this.restaurantService.randomedRestaurant$;
  public randomFromLocal() {
    this.restaurantService.random();
  }

  public randomFromNetwork() {
    this.restaurantService.fromNetwork();
  }

  public add(name: string) {
    this.restaurantService.addRestaurant({
      name
    });
  }

  public clear() {
    this.restaurantService.clear();
  }
}
