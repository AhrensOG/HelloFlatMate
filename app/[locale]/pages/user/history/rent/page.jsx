"use client";
import RentHistory from "@/app/components/user/history/rent/RentHistory";
import { useRouter } from "next/navigation";
export default function Rents() {
  const route = useRouter();

  return <RentHistory redirect={() => route.back()} />;
}
