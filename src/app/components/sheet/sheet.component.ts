import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RestaurantService, IRestaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent {

  constructor(
    private restaurantService: RestaurantService
  ) { }

  public restaurants$ = this.restaurantService.restaurants$;

  public add(name: string) {
    this.restaurantService.addRestaurant({
      name
    });
  }

  public delete(restaurant: IRestaurant) {
    this.restaurantService.removeRestaurant(restaurant);
  }
}
