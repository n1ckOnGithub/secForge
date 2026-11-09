import { createFileRoute } from '@tanstack/react-router'
import { getTool } from '../lib/server-fns';

export const Route = createFileRoute("/tools/toolId")({
  loader: ({ params }) => getTool({ data: { slug: params.toolId } }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.tool?.name ?? "Tool"} — Arsenal` },
      {
        name: "description",
        content:
          loaderData?.tool?.summary ??
          "A tool from the Arsenal cybersecurity index.",
      },
    ],
  }),
  component: ToolPage,
});

function ToolPage() {
  return <div>Hello "/tools/toolId"!</div>
}
