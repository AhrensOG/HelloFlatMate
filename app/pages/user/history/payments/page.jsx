"use client";
import PaymentPage from "@/app/components/user/history/payments/PaymentPage";
import { Context } from "@/app/context/GlobalContext";
import React, { useContext } from "react";

const Payments = () => {
  const { state } = useContext(Context);
  return <PaymentPage redirect={() => route.back()} user={state.user} />;
};

export default Payments;
