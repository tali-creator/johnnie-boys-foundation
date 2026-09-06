import axios from "axios";

const PAYSTACK_BASE = "https://api.paystack.co";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

export interface InitializePaymentParams {
  email: string;
  amount: number; // in kobo (NGN * 100)
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}

export async function initializePayment(params: InitializePaymentParams) {
  const response = await axios.post(
    `${PAYSTACK_BASE}/transaction/initialize`,
    {
      email: params.email,
      amount: params.amount,
      currency: params.currency || "NGN",
      reference: params.reference,
      callback_url: params.callback_url,
      metadata: params.metadata,
    },
    { headers: getHeaders() }
  );
  return response.data;
}

export async function verifyPayment(reference: string) {
  const response = await axios.get(
    `${PAYSTACK_BASE}/transaction/verify/${reference}`,
    { headers: getHeaders() }
  );
  return response.data;
}

export function generateReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `JBF-${timestamp}-${random}`.toUpperCase();
}
