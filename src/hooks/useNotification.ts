import { supabase } from '@/services/supabase/client';
import type { TNotifications } from '@/types/types';


export function useNotification() {
  const sendNotification = async (data: {
    userId: string;
    fromUserId: string;
    type: TNotifications;
    title: string;
    message: string;
    link?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: data.userId,
          from_user_id: data.fromUserId,
          type: data.type,
          title: data.title,
          message: data.message,
          link: data.link,
          is_read: false,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  return { sendNotification };
}