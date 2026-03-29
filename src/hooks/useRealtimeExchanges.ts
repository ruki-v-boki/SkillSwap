import { fetchMyOffers, fetchPendingIncoming } from '@/services/slices/exchangeSlice';
import { supabase } from '@/services/supabase/client';
import { useDispatch } from '@/services/store';
import { useEffect } from 'react';

// ---------------------------------------------------------------

export function useRealtimeExchanges(userId: string | null) {
  const dispatch = useDispatch();

// ---------------------------------------------------------------

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('exchange_offers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exchange_offers',
          filter: `from_user_id=eq.${userId},to_user_id=eq.${userId}`,
        },
        () => {
          dispatch(fetchMyOffers(userId));
          dispatch(fetchPendingIncoming(userId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, dispatch]);
}