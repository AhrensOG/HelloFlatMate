"use client";
import DocumentsList from "@/app/components/client/documents/DocumentsList";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function Documents() {
  return (
    <>
      <header className="px-2">
        <NavBar />
      </header>
      <DocumentsList />
    </>
  );
}
