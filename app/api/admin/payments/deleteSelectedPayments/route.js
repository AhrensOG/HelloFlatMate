import { deleteSelectedPayments } from "./controllers/deleteSelectedPayments";

export async function POST(req) {
  return await deleteSelectedPayments(req);
}
