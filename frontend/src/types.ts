export type UserID = string;
export type TopicID = string;
export type MessageID = string;

export interface User {
  id: UserID;
  username: string;
  avatar: string;
  bio?: string;
  isOnline: boolean;
}

export interface Topic {
  id: TopicID;
  title: string;
  category: 'general' | 'technology' | 'sports' | 'entertainment' | 'education' | 'business' | 'health' | 'politics';
  author: User;
  participantCount: number;
  expiresAt: Date;
  isArchived: boolean;
}

export interface Message {
  id: MessageID;
  topicId: TopicID;
  author: User;
  content: string;
  timestamp: Date;
  parentId?: MessageID;
  reactionCounts: Record<string, number>;
}
