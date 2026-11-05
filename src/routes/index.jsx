import { createFileRoute } from "@tanstack/react-router";
import SiteHeader from "../components/SiteHeader";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
    </>
  );
}
