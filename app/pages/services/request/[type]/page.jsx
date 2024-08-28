"use client";
import RequestService from "@/app/components/history/services/RequestService";

export default function RequestServicePage(params) {
  const { type } = params.params;
  return <RequestService type={type} />;
}
