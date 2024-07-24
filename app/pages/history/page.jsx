"use client";
import ApplicationsHistory from "@/app/components/history/application/ApplicationsHistory";
import RentHistory from "@/app/components/history/rent/RentHistory";
import TransactionHistory from "@/app/components/history/transactions/TransactionHistory";
import { useSearchParams, useRouter } from "next/navigation";

export default function History() {
  const param = useSearchParams().get("param");
  const route = useRouter();

  const handleRedirect = (urls) => {
    route.push(urls);
  };

  return (
    <Suspense>
      {param == "rent" ? (
        <RentHistory redirect={() => handleRedirect("/pages/profile")} />
      ) : param == "applications" ? (
        <ApplicationsHistory
          redirect={() => handleRedirect("/pages/profile")}
        />
      ) : param == "transactions" ? (
        <TransactionHistory redirect={() => handleRedirect("/pages/profile")} />
      ) : null}
    </Suspense>
  );
}
