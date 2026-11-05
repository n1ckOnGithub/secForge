import { createFileRoute } from "@tanstack/react-router";
import SiteHeader from "../components/SiteHeader";
import HeroSection from "../components/HeroSection";
import SiteFooter from "../components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <SiteFooter />
    </>
  );
}
