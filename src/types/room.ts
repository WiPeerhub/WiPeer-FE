export interface Room {
  roomId: string;
  ip: string;
  title: string;
  description: string | null;
  isPrivate: boolean;
  password: string | null;
  ownerId: string;
}
