import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeolocationService } from './geolocation.service';

export type IRestaurant = {
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private geolocationService: GeolocationService
  ) {
    this.loadFromStorage();
  }

  public restaurants$ = new BehaviorSubject<IRestaurant[]>([]);

  public randomedRestaurant$ = new BehaviorSubject<IRestaurant | null>(null);

  public addRestaurant(restaurant: IRestaurant) {
    const current = this.restaurants$.getValue();
    this.restaurants$.next(current.concat(restaurant));
    this.saveToStorage();
  }

  public removeRestaurant(restaurant: IRestaurant) {
    const current = this.restaurants$.getValue();
    const index = current.findIndex(i => i === restaurant);
    if (index >= 0) {
      current.splice(index, 1);
    }
    this.restaurants$.next(current);
  }

  public clear() {
    this.restaurants$.next([]);
    this.saveToStorage();
  }

  public random() {
    const current = this.restaurants$.getValue();
    const range = current.length;
    if (range === 0) {
      return null;
    }

    const randomed = Math.floor(Math.random() * range);
    this.randomedRestaurant$.next(current[randomed]);
  }

  public randomFromGiven(restaurants: IRestaurant[]) {
    const current = restaurants;
    const range = current.length;
    if (range === 0) {
      return null;
    }

    const randomed = Math.floor(Math.random() * range);
    this.randomedRestaurant$.next(current[randomed]);
  }

  public async fromNetwork() {
    (await this.geolocationService.getNearby())
      .subscribe(res => {
        this.randomFromGiven(res);
      });
  }

  private saveToStorage() {
    localStorage.setItem('rest', JSON.stringify(this.restaurants$.getValue()));
  }
  private loadFromStorage() {
    this.restaurants$.next(JSON.parse(localStorage.getItem('rest') || '[]'));
  }
}
