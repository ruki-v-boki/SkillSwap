export type TNotifications = 'offer' | 'acceptOffer';

export type Notification = {
  id: string;
  user_id: string;
  from_user_id: string;
  type: TNotifications;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
};