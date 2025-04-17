import { createPaymentForOwner } from "./controllers/createPaymentForOwner";
import { createPaymentForUser } from "./controllers/createPaymentForUser";

export async function POST(req) {
  const data = await req.json();

  if (data.responsibility === "CLIENT") {
    return await createPaymentForUser(data);
  }

  const result = await createPaymentForOwner(data);
  return result;
}
