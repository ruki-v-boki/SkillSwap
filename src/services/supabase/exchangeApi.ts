import type { ExchangeOffer, CreateExchangeOffer, RespondToExchange, ExchangeStatus } from '@/types/exchange';
import { supabase } from './client';

// ---------------------------------------------------------------

export class SupabaseExchangeAPI {

  async createOffer(fromUserId: string, data: CreateExchangeOffer): Promise<ExchangeOffer> {
    const { data: result, error } = await supabase
      .from('exchange_offers')
      .insert({
        from_user_id: fromUserId,
        to_user_id: data.toUserId,
        message: data.message || null,
        status: 'pending',
      })
      .select()
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!result) throw new Error('Не удалось создать предложение');

    return this.transformOffer(result);
  }

// ---------------------------------------------------------------

  async respondToOffer(userId: string, data: RespondToExchange): Promise<ExchangeOffer> {
    const { data: existing, error: checkError } = await supabase
      .from('exchange_offers')
      .select('id')
      .eq('id', data.offerId)
      .eq('to_user_id', userId)
      .maybeSingle();

    if (checkError) throw new Error(checkError.message);
    if (!existing) throw new Error('Предложение не найдено');

    const { data: updated, error: updateError } = await supabase
      .from('exchange_offers')
      .update({ status: data.status })
      .eq('id', data.offerId)
      .select()
      .maybeSingle();

    if (updateError) throw new Error(updateError.message);
    if (!updated) throw new Error('Не удалось обновить предложение');

    return this.transformOffer(updated);
  }

// ---------------------------------------------------------------

  async getUserOffers(userId: string): Promise<ExchangeOffer[]> {
    const { data, error } = await supabase
      .from('exchange_offers')
      .select('*')
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map(item => this.transformOffer(item));
  }

// ---------------------------------------------------------------

  async getPendingIncomingOffers(userId: string): Promise<ExchangeOffer[]> {
    const { data, error } = await supabase
      .from('exchange_offers')
      .select('*')
      .eq('to_user_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map(item => this.transformOffer(item));
  }

// ---------------------------------------------------------------

  // private transformOffer(offer: any): ExchangeOffer {
  //   return {
  //     id: offer.id,
  //     fromUserId: offer.from_user_id,
  //     toUserId: offer.to_user_id,
  //     status: offer.status,
  //     message: offer.message || undefined,
  //     createdAt: offer.created_at,
  //     updatedAt: offer.updated_at,
  //   };
  // }
  private transformOffer(offer: {
    id: string;
    from_user_id: string;
    to_user_id: string;
    status: ExchangeStatus;
    message?: string | null;
    created_at: string;
    updated_at: string;
  }): ExchangeOffer {
    return {
      id: offer.id,
      fromUserId: offer.from_user_id,
      toUserId: offer.to_user_id,
      status: offer.status,
      message: offer.message || undefined,
      createdAt: offer.created_at,
      updatedAt: offer.updated_at,
    };
  }
}

export const exchangeAPI = new SupabaseExchangeAPI();