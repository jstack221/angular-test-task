import { ConversationState, initialConversationState } from '../state/conversation.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as ConversationActions from '../actions/conversation.actions';
import { Conversation } from '../../models/index';

export const intialState = initialConversationState();

const reducer = createReducer(
  intialState,
  on(ConversationActions.GetConversationAction, state => state),
  on(ConversationActions.CreateConversationAction, (state: ConversationState, todo: Conversation) => {
    return {...state, conversations: [...state.conversations, todo]};
  }),
  on(ConversationActions.SuccessGetConversationAction, (state: ConversationState, {payload}) => {
    return {...state, conversations: payload};
  }),
  on(ConversationActions.SuccessCreateMessageInConversationAction, (state: ConversationState, {payload}) => {
    return {
      ...state,
      conversations: state.conversations.map(conversation => {
        if (conversation.id === payload.conversationId) {
          return {
            ...conversation,
            messages: conversation.messages.concat(payload)
          };
        }
        return conversation;
      })
    };
  }),
  on(ConversationActions.ErrorConversationAction, (state: ConversationState, error: Error) => {
    return {...state};
  })
);

export function ConversationReducer(state: ConversationState | undefined, action: Action) {
  return reducer(state, action);
}
