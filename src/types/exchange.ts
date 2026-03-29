export type ExchangeStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export type ExchangeOffer = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: ExchangeStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateExchangeOffer = {
  toUserId: string;
  message?: string;
}

export type RespondToExchange = {
  offerId: string;
  status: 'accepted' | 'rejected';
}