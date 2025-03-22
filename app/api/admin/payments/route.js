export const dynamic = "force-dynamic";
import { getAllPayments } from "./controllers/getAllPayments";


export async function GET(req) {
  return await getAllPayments();
}