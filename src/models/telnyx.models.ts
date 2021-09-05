export interface ReceivedMessage {
  data: MessageData;
  meta: Meta;
}

export interface MessageData {
  event_type: 'message.received' | 'message.sent' | 'message.finalized';
  id: string;
  occurred_at: Date;
  payload: MessagePayload;
  record_type: string;
}

export interface MessagePayload {
  cc: any[];
  completed_at: null;
  cost: null;
  direction: string;
  encoding: string;
  errors: any[];
  from: From;
  id: string;
  media: any[];
  messaging_profile_id: string;
  organization_id: string;
  parts: number;
  received_at: Date;
  record_type: string;
  sent_at: null;
  tags: any[];
  text: string;
  to: From[];
  type: string;
  valid_until: null;
  webhook_failover_url: string;
  webhook_url: string;
}

export interface From {
  carrier: string;
  line_type: string;
  phone_number: string;
  status?: string;
}

export interface Meta {
  attempt: number;
  delivered_to: string;
}
