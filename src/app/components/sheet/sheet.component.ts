import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RestaurantService, IRestaurant } from '../../services/restaurant.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent {

  constructor(
    private restaurantService: RestaurantService,
    private geolocationService: GeolocationService
  ) { }

  public restaurants$ = this.restaurantService.restaurants$;

  public online = this.geolocationService.isOnline();

  public add(name: string) {
    this.restaurantService.addRestaurant({
      name
    });
  }

  public delete(restaurant: IRestaurant) {
    this.restaurantService.removeRestaurant(restaurant);
  }

  public updateFromNetwork() {
    this.restaurantService.fromNetwork();
  }
}
