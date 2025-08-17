export interface Room {
  roomId: string;
  ip: string;
  title: string;
  description?: string;
  isPrivate?: boolean;
  password?: string;
  ownerId: string;
  timestamp?: number;
}
