export type TNotifications = 'offer' | 'acceptOffer';

export type Notification = {
  notificationId: string;
  toUserId: string;
  fromUserId: string;
  type: TNotifications;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  created_at: string;
}