import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { TasksHelperService } from "../../services/tasks-helper.service";
import { Message } from "../../models";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fourth-task',
  templateUrl: './fourth-task.component.html',
  styleUrls: ['./fourth-task.component.scss']
})
export class FourthTaskComponent implements OnInit {
  messages: any;

  constructor(private tasksHelperService: TasksHelperService) {}

  ngOnInit() {
    this.updateMessageList('', true);
  }

  public onInputChange($event) {
    this.updateMessageList($event.target.value);
  }

  /**
   * Method is used for update the message List whenever user modify the text in input 
   * Field.
   * 
   * @param keyword {string}
   * @param isInitialRequest {boolean | null} 
   * 
   */
  private updateMessageList(keyword: string, isInitialRequest?: boolean) {
    this.searchMessages(keyword, isInitialRequest)
      .pipe(first())
      .subscribe(messages => this.messages = messages);
  }

  /**
   * Method is used for search the message in the messageList which
   * we're getting from the API call.
   * 
   * @param keyword {string}
   * @param isInitialRequest {boolean | null} 
   * 
   * @returns Observable<Message[]>
   * 
   */
  private searchMessages(keyword: string, isInitialRequest: boolean): Observable<Message[]> {
    return this.tasksHelperService.getMessages()
      .pipe(map(messages => {
        if (isInitialRequest) {
          return messages;
        } else {
          return this.filterMessage(messages, keyword);
        }
      }
    ));
  }

  /**
   * Method is used for filtering the messageList based on the input text.
   * 
   * @param messages {Message[]}
   * @param keyword {string}
   * 
   * @returns Message[]s
   * 
   */
  private filterMessage(messages: Message[], keyword: string): Message[] {
    return messages.filter((message) => {
      const messageLowerCaseText = this.tasksHelperService.convertTextToLowerCase(message.text);
      const keywordLowerText = this.tasksHelperService.convertTextToLowerCase(keyword);
      return (messageLowerCaseText.indexOf(keywordLowerText) > -1)
    });
  }
}
