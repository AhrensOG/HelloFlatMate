"use client";
import RequestService from "@/app/components/user/history/services/RequestService";

export default function RequestServicePage(params) {
  const { type, id } = params.params;

  return <RequestService type={type} id={id} />;
}
