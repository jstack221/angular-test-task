import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ConversationState } from '../../store/state/conversation.state';
import { Conversation } from '../../models';
import { BeginGetConversationAction } from '../../store/actions/conversation.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit, OnDestroy {
  private ConversationSubscription: Subscription;
  private conversation$: Observable<any>;
  public conversationList: Conversation[];
  @ViewChild('dataTheme') dataTheme: ElementRef;
  themes = ['light', 'dark'];
  selectedTheme = 'light';

  constructor(
    private store: Store<ConversationState>
  ) {
    this.conversation$ = store.pipe(select('conversations'));
  }

  ngOnInit(): void {
    this.initiateConversationSubscription();
  }

  /**
   * Method is used to initiate the converation subscription.
   * 
   */
  initiateConversationSubscription() {
    this.ConversationSubscription = this.conversation$
      .subscribe(x => this.conversationList = x.conversations);

    this.store.dispatch(BeginGetConversationAction());
  }

  /**
   * Method is used to set the selectedTheme.
   * 
   * @param selectedTheme string
   * 
   */
  themeChange(selectedTheme: string) {
    this.selectedTheme = selectedTheme;
  }

  ngOnDestroy(): void {
    // Unsubscribe the subscription 'conversationSubscription' if not present
    if (this.ConversationSubscription) {
      this.ConversationSubscription.unsubscribe();
    }
  }
}
