"use client";
import TransactionHistory from "@/app/components/user/history/transactions/TransactionHistory";
import { useRouter } from "next/navigation";
export default function Transactions() {
  const route = useRouter();
  return <TransactionHistory redirect={() => route.back()} />;
}
