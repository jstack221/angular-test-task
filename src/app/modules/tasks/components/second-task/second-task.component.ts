import { Component, OnInit } from '@angular/core';
import { CheckOnlineStatusService } from "../../services/check-online-status.service";
import { UserService } from "../../services/user.service";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-second-task',
  templateUrl: './second-task.component.html',
  styleUrls: ['./second-task.component.scss']
})
export class SecondTaskComponent implements OnInit {
  isUserOnline$: Observable<boolean>;
  isUserLoggedIn$: Observable<boolean>;

  constructor(
    private checkOnlineStatusService: CheckOnlineStatusService,
    private userService: UserService,
  ) {
    this.isUserLoggedIn$ = this.userService.isUserLoggedIn();
  }

  ngOnInit() {
    this.isUserOnline();  
  }

  /**
   * Method to check if user online by checking whether he has
   * loggedIn and online.
   * 
   */
  isUserOnline()
  {
    this.isUserOnline$ = combineLatest(
      this.userService.isUserLoggedIn(),
      this.checkOnlineStatusService.getOnlineStatus()
    ).pipe(
      map(pair => {
        const [isUserLogged, isOnline] = pair;
        return isUserLogged && isOnline;
      })
    );
  }
  
  login() {
    this.userService.login();
  }

  logOut() {
    this.userService.logOut();
  }
}
