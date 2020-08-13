import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SheetComponent } from './components/sheet/sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private restaurantService: RestaurantService,
    private bottomSheet: MatBottomSheet
  ) { }
  title = 'eatwhat';

  private subscription: Subscription = new Subscription();

  public result$ = this.restaurantService.randomedRestaurant$.pipe(delay(250));

  public randomClick$: Subject<MouseEvent> = new Subject<MouseEvent>();

  public restaurants$ = this.restaurantService.restaurants$;

  public animating = false;

  public ngOnInit() {
    this.subscription.add(this.randomClick$.subscribe(this.randomFromLocal.bind(this)));
    this.subscription.add(this.result$.pipe(delay(250)).subscribe(_ => this.animating = false));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public randomFromLocal() {
    if (this.animating) {
      return;
    }
    this.animating = true;
    this.restaurantService.random();
  }

  public randomFromNetwork() {
    this.restaurantService.fromNetwork();
  }

  public openSheet() {
    this.bottomSheet.open(SheetComponent);
  }

}
