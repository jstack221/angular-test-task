import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksHelperService } from "../../services/tasks-helper.service";
import { CheckOnlineStatusService } from "../../services/check-online-status.service";
import { Subscription, timer, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { User } from "../../models";

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html',
  styleUrls: ['./first-task.component.scss']
})

export class FirstTaskComponent implements OnInit, OnDestroy {
  checkOnlineSubscription: Subscription;
  userSubscription: Subscription;
  user: User;
  isOnline$: Observable<boolean>;

  constructor(
    private tasksHelperService: TasksHelperService,
    private checkOnlineStatusService: CheckOnlineStatusService
  ) {
    this.isOnline$ = this.checkOnlineStatusService.getOnlineStatus();
  }

  ngOnInit(): void {
    this.checkOnlineStatus();
  }

  /**
   * Method is user for checking the user's online status and activate the polling 
   * if online otherwise stop the polling.
   * 
   */
  checkOnlineStatus()
  {
    this.checkOnlineSubscription = this.checkOnlineStatusService.getOnlineStatus()
      .subscribe(
        (isOnline) => {
          if (isOnline) {
            this.startPoling();
          } else {
            this.stopPoling();
          }
        },
        (error) => {
          console.error('Error while checking the user online status', error);
        }
      );
  }

  /**
   * Method is used for start the polling.
   * 
   */
  startPoling() {
    this.userSubscription = timer(0, 1000)
      .pipe(concatMap(x => this.tasksHelperService.getUser()))
      .subscribe(
        (userData) => {
          this.user = userData;
        }, 
        (error) => {
          console.log('Error while calling the get user method', error);
        }  
      );
  }

  /**
   * Method is used for stop the polling.
   * 
   */
  stopPoling() {
    this.userSubscription.unsubscribe();
  }

  ngOnDestroy() {
    // Unsubscribe the userSubscription if it found 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    // Unsubscribe the checkOnlineSubscription if it found 
    if (this.checkOnlineSubscription) {
      this.checkOnlineSubscription.unsubscribe();
    }
  }
}
