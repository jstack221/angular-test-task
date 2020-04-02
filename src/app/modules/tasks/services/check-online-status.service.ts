import { fromEvent, Observable, Subscription, of, merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { mapTo } from 'rxjs/operators';;

@Injectable({
  providedIn: 'root'
})
export class CheckOnlineStatusService {
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;
  private isOnline$: Observable<boolean>;

  constructor() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.initiateSubscriptionEvent();
  }
  
  /**
   * Method is used for initiate the subscription to check whether user is online
   * on the basis of network check.
   * 
   */
  initiateSubscriptionEvent() {
    this.isOnline$ = merge(
      of(navigator.onLine),
      this.onlineEvent.pipe(mapTo(true)),
      this.offlineEvent.pipe(mapTo(false))
    );
  }

  /**
   * Method is used for return the online status.
   * 
   * @returns Observable<boolean>
   * 
   */
  getOnlineStatus(): Observable<boolean> {
    return this.isOnline$;
  }
}