import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  BeginCreateMessageInConversationAction,
  BeginGetConversationAction,
  ErrorConversationAction,
  SuccessCreateMessageInConversationAction,
  SuccessGetConversationAction
} from '../actions/conversation.actions';

import { Conversation, UserMessage } from '../../models/index';

@Injectable()
export class ConversationEffects {
  constructor(
    private action$: Actions,
  ) {
  }

  private conversations$ = new BehaviorSubject<Conversation[]>([
    {
      id: 1,
      userName: 'Test',
      messages: [
        {
          id: 1,
          conversationId: 1,
          message: 'text',
          createdDate: new Date()
        }
      ]
    }
  ]);

  GetConversations$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BeginGetConversationAction),
      mergeMap(action =>
        this.conversations$.pipe(
          map((data: Conversation[]) => {
            return SuccessGetConversationAction({payload: data});
          }),
          catchError((error: Error) => {
            return of(ErrorConversationAction(error));
          })
        )
      )
    )
  );

  CreateMessageOfConversation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BeginCreateMessageInConversationAction),
      mergeMap(action => {
          return of(action.payload).pipe(
            map((data: UserMessage) => {
              return SuccessCreateMessageInConversationAction({payload: data});
            })
          );
        }
      )
    )
  );
}
