"use client";
import React, { Suspense } from "react";

const Wrapper = ({ children }) => {
  return <Suspense fallback={<div></div>}>{children}</Suspense>;
};

export default Wrapper;
