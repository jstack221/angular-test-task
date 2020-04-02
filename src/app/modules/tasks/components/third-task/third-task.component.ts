import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

@Component({
  selector: 'app-third-task',
  templateUrl: './third-task.component.html',
  styleUrls: ['./third-task.component.scss']
})
export class ThirdTaskComponent implements OnInit, OnDestroy {
  private myNumber$: Observable<number>;
  private numberSubscription: Subscription;

  numbers: number[] = [];

  ngOnInit(): void {
    this.myNumber$ = timer(0, 500);
    this.numberSubscription = this.getNumbers()
      .subscribe(arrayOfNumbers => this.numbers = arrayOfNumbers);
  }

  /**
   * Method is used to get the numbers after the mentioned buffer time i.e 2000 ms.
   * 
   * @returns Observable<number[]>
   * 
   */
  getNumbers(): Observable<number[]> {
    return this.myNumber$.pipe(bufferTime(2000));
  }

  ngOnDestroy(): void {
    // Unsubscribe the numberSubscription if it present
    if (this.numberSubscription) {
      this.numberSubscription.unsubscribe();
    }
  }
}
