import { UserMessage } from './userMessage';

export interface Conversation {
  id: number;
  messages: UserMessage[];
  userName: string;
}
