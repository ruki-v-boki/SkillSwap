import { addNotification } from '@/services/slices/notificationsSlice';
import type { Notification } from '@/types/notifications';
import { supabase } from '@/services/supabase/client';
import { useDispatch } from '@/services/store';
import { useEffect } from 'react';

// ---------------------------------------------------------------

export function useRealtimeNotifications(userId: string | null) {

  const dispatch = useDispatch();

// ---------------------------------------------------------------

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          dispatch(addNotification(payload.new as Notification));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [
    userId,
    dispatch
  ]);
};