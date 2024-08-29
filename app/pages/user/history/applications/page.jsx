"use client";
import ApplicationsHistory from "@/app/components/user/history/application/ApplicationsHistory";
import { useRouter } from "next/navigation";
export default function Applications() {
  const route = useRouter();
  return <ApplicationsHistory redirect={() => route.back()} />;
}
