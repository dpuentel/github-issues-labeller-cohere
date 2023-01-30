import { useState, useEffect, useRef } from "react";
import { useGitHubIssues } from "../hooks/useGitHubIssues";
import type { CohereClassification } from "../interfaces/Cohere";
import type { GitHubIssuesRequestParams, Issue } from "../interfaces/GitHub";
import {
  classify,
  generateExamplesByIssues,
  generateInputsByIssues,
} from "../services/Cohere";
import { gitHubIssuesGetter } from "../services/Github";
import { ErrorContainer } from "./ErrorContainer";
import { IssuesList } from "./IssuesList";

interface SearchRepoProps {
  placeholder: string;
  label: string;
}

export function SearchRepo({ placeholder, label }: SearchRepoProps) {
  const githubUrlInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const {
    issues,
    issuesError,
    issuesLabeled,
    issuesUnlabelled,
    issuesGroupedByLabel,
    reloadIssuesUnlabelledWithPredictions,
  } = useGitHubIssues({ url });
  const [classifies, setClassifies] = useState<CohereClassification[]>([]);

  useEffect(() => {
    if (githubUrlInput.current && !url) {
      githubUrlInput.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!issuesGroupedByLabel || Object.keys(issuesGroupedByLabel).length === 0)
      return;

    classify({
      inputs: generateInputsByIssues(issuesUnlabelled),
      examples: generateExamplesByIssues(issuesGroupedByLabel),
    }).then((classifies) => {
      if (!classifies || !classifies?.classifications) {
        console.error("classifies is undefined");
        return;
      }
      setClassifies(classifies.classifications);
    });
  }, [issuesLabeled]);

  useEffect(() => {
    const newIssuesUnlabelled = [...issuesUnlabelled];
    classifies.forEach((classify) => {
      const prediction = classify.prediction;
      const confidence = classify.confidence;
      const issue = newIssuesUnlabelled.find(
        (issue) => issue.title === classify.input
      );
      if (!issue) return;
      issue.prediction = prediction;
      issue.confidence = Number((confidence * 100).toFixed());
    });
    reloadIssuesUnlabelledWithPredictions(newIssuesUnlabelled);
  }, [classifies]);

  return (
    <>
      <label className="w-full flex flex-row">
        <span className="w-fit">{label}</span>
        <input
          ref={githubUrlInput}
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full rounded-lg p-2 bg-gray-800"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoFocus
        />
      </label>
      {issuesError && <ErrorContainer error={issuesError} />}

      {issues.length > 0 && (
        <>
          <IssuesList issues={issuesUnlabelled} headerText={"Unlabeled"} />
          <IssuesList issues={issuesLabeled} headerText={"Labeled"} />
        </>
      )}
    </>
  );
}
