import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConversationState } from '../../store/state/conversation.state';
import { Conversation, UserMessage } from '../../models';
import { BeginCreateMessageInConversationAction } from '../../store/actions/conversation.actions';
import { TasksHelperService } from '../../services/tasks-helper.service';

@Component({
  selector: 'app-last-task',
  templateUrl: './last-task.component.html',
  styleUrls: ['./last-task.component.scss']
})
export class LastTaskComponent implements OnInit {
  @Input() conversation: Conversation;
  message = '';

  constructor(
    private store: Store<ConversationState>,
    private tasksHelperService: TasksHelperService,
  ) {}

  ngOnInit() {}
  
  /**
   * Method is used to send the message when user clicks on the button.
   * 
   */
  sendMessage() {
    if (!this.tasksHelperService.isVaidString(this.message)) {
      return;
    }
    
    this.store.dispatch(BeginCreateMessageInConversationAction({
      payload: {
        id: this.getUserId(),
        conversationId: this.conversation.id,
        message: this.message,
        createdDate: new Date()
      } as UserMessage
    }));

    this.message = '';
  }

  /**
   * Method is used for generating the random userId.
   * 
   */
  getUserId(): number {
    return Math.floor(Math.random() * 2000) + 1;
  }
}
