import { Conversation } from '../../models/index';

export interface ConversationState {
  conversations: Conversation[];
}

export const initialConversationState = () => {
  return {conversations: Array<Conversation>()};
};
