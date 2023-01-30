import type { Issue } from "../interfaces/GitHub";
import { Link } from "./Link";

export function IssueListItem({ issue }: { issue: Issue }) {
  return (
    <>
      <span
        className="w-fit rounded-lg p-2 text-gray-900 font-semibold"
        style={{
          backgroundColor: `#${issue.labels.at(0)?.color ?? "e6dae7"}`,
        }}
      >
        {issue.labels.at(0)?.name ?? "NO LABEL"}
      </span>
      <Link
        customClass="col-span-4 hover:text-gray-200"
        title={issue.title}
        href={issue.html_url}
        external={true}
      />
      {issue.prediction && (
        <span
          className="w-fit rounded-lg p-2 text-gray-900 font-black ml-auto relative col-span-2"
          style={{
            background: `linear-gradient(to right, #22c55e ${issue.confidence}%,#e6dae7 ${issue.confidence}%)`,
          }}
        >
          {issue.prediction}
          <span className="text-gray-800 text-4xl px-1 absolute left-0 right-0 text-center opacity-50 font-black top-0">
            {issue.confidence}%
          </span>
        </span>
      )}
    </>
  );
}