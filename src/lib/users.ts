import { api } from "@/lib/api";

type CreateMerchantUserPayload = {
  name: string;
  email: string;
  password: string;
  role_id: number;
};

export async function createMerchantUser(
  merchantId: number,
  payload: CreateMerchantUserPayload
) {
  const { data } = await api.post(`/merchants/${merchantId}/users`, payload);
  return data;
}
await createMerchantUser(42, {
  name: "Alice Manager",
  email: "alice@grossiste.fr",
  password: "secret123",
  role_id: 2,
});
