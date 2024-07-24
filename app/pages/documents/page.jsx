import DocumentsList from "@/app/components/documents/DocumentsList";
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
