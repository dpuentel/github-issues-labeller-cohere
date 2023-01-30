export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at?: any;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface Issue {
  active_lock_reason?: any;
  assignee?: any;
  assignees: any[];
  author_association: string;
  body: string;
  closed_at?: any;
  comments_url: string;
  comments: number;
  confidence?: number;
  created_at: Date;
  draft: boolean;
  events_url: string;
  html_url: string;
  id: number;
  labels_url: string;
  labels: Label[];
  locked: boolean;
  milestone?: any;
  node_id: string;
  number: number;
  performed_via_github_app?: any;
  prediction?: string;
  pull_request: PullRequest;
  reactions: Reactions;
  repository_url: string;
  state_reason?: any;
  state: string;
  timeline_url: string;
  title: string;
  updated_at: Date;
  url: string;
  user: User;
}

export interface GitHubIssuesRequestParams {
  owner: string;
  repo: string;
}

export interface IssuesGroupedByLabel {
  [key: string]: Issue[];
}
