import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRestaurant } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) { }

  private latitued = 0;

  private longtitude = 0;

  public nearbyShops$ = new BehaviorSubject([]);

  public async getNearby(): Promise<Observable<IRestaurant[]>> {
    await this.queryLocation();
    const params = {
      location: `${this.longtitude},${this.latitued}`,
      key: 'c138f202903f97c0fd72e7ccb42bcc76',
      types: '050300',
      sig: 'ed50d12efb14be7253417de9f2618f4a'
    };
    return this.http.get(
      'https://restapi.amap.com/v3/place/around',
      {
        params: {
          ...params,
        }
      }
    ).pipe(
      map(
        (res: any) => {
          const pois = res.pois;
          return pois.map(poi => ({ name: poi.name}));
        }
      )
    );
  }

  public queryLocation() {
    return new Promise((resolve, reject) => {

      if (!this.checkSupport()) {
        throw new Error('Not Supported');
      }

      const onQuerySuccess = (position: Position) => {
        this.latitued = position.coords.latitude;
        this.longtitude = position.coords.longitude;
        resolve();
      };

      const onQueryFail = (err: PositionError) => {
        console.error(err);
        reject(err);
      };

      navigator.geolocation.getCurrentPosition(onQuerySuccess, onQueryFail);
    });
  }

  private checkSupport() {
    if (!navigator.geolocation) {
      return false;
    } else {
      return true;
    }
  }
}
