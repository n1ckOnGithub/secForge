import { createFileRoute } from "@tanstack/react-router";
import { getCategoryGuide } from "../lib/server-fns";

export const Route = createFileRoute("/categories/$categoryId")({
  loader: ({ params }) =>
    getCategoryGuide({ data: { slug: params.categoryId } }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category?.name ?? "Guide"} — Arsenal` },
      {
        name: "description",
        content:
          loaderData?.category?.summary ??
          "A practical guide to one discipline in the Arsenal security index.",
      },
    ],
  }),
  component: CategoryPage,
});

const JUMP_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "start", label: "Where to start" },
  { id: "tools", label: "Key tools" },
  { id: "reading", label: "Further reading" },
];

function CategoryPage() {
  return <div>Hello "/categories"!</div>;
}
