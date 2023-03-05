export interface User {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
}

export interface Label {
	id: number
	node_id: string
	url: string
	name: string
	description: string
	color: string
	default: boolean
}

export interface Assignee {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
}

export interface Assignee2 {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
}

export interface Creator {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
}

export interface Milestone {
	url: string
	html_url: string
	labels_url: string
	id: number
	node_id: string
	number: number
	state: string
	title: string
	description: string
	creator: Creator
	open_issues: number
	closed_issues: number
	created_at: Date
	updated_at: Date
	closed_at: Date
	due_on: Date
}

export interface PullRequest {
	url: string
	html_url: string
	diff_url: string
	patch_url: string
}

export interface Owner {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
}

export interface Permissions {
	admin: boolean
	push: boolean
	pull: boolean
}

export interface License {
	key: string
	name: string
	url: string
	spdx_id: string
	node_id: string
	html_url: string
}

export interface Repository {
	id: number
	node_id: string
	name: string
	full_name: string
	owner: Owner
	private: boolean
	html_url: string
	description: string
	fork: boolean
	url: string
	archive_url: string
	assignees_url: string
	blobs_url: string
	branches_url: string
	collaborators_url: string
	comments_url: string
	commits_url: string
	compare_url: string
	contents_url: string
	contributors_url: string
	deployments_url: string
	downloads_url: string
	events_url: string
	forks_url: string
	git_commits_url: string
	git_refs_url: string
	git_tags_url: string
	git_url: string
	issue_comment_url: string
	issue_events_url: string
	issues_url: string
	keys_url: string
	labels_url: string
	languages_url: string
	merges_url: string
	milestones_url: string
	notifications_url: string
	pulls_url: string
	releases_url: string
	ssh_url: string
	stargazers_url: string
	statuses_url: string
	subscribers_url: string
	subscription_url: string
	tags_url: string
	teams_url: string
	trees_url: string
	clone_url: string
	mirror_url: string
	hooks_url: string
	svn_url: string
	homepage: string
	language?: string
	forks_count: number
	stargazers_count: number
	watchers_count: number
	size: number
	default_branch: string
	open_issues_count: number
	is_template: boolean
	topics: string[]
	has_issues: boolean
	has_projects: boolean
	has_wiki: boolean
	has_pages: boolean
	has_downloads: boolean
	archived: boolean
	disabled: boolean
	visibility: string
	pushed_at: Date
	created_at: Date
	updated_at: Date
	permissions: Permissions
	allow_rebase_merge: boolean
	temp_clone_token: string
	allow_squash_merge: boolean
	allow_auto_merge: boolean
	delete_branch_on_merge: boolean
	allow_merge_commit: boolean
	subscribers_count: number
	network_count: number
	license: License
	forks: number
	open_issues: number
	watchers: number
}

export interface Issue {
	id: number
	node_id: string
	url: string
	repository_url: string
	labels_url: string
	comments_url: string
	events_url: string
	html_url: string
	number: number
	state: string
	title: string
	body: string
	user: User
	labels: Label[]
	assignee: Assignee
	assignees: Assignee2[]
	milestone: Milestone
	locked: boolean
	active_lock_reason: string
	comments: number
	pull_request: PullRequest
	closed_at?: string
	created_at: Date
	updated_at: Date
	repository: Repository
	author_association: string
	prediction?: string
	confidence?: number
}

export interface GitHubIssuesRequestParams {
	owner: string
	repo: string
	accessToken: string | null
}

export interface IssuesGroupedByLabel {
	[key: string]: Issue[]
}

export interface GitHubAccessTokenResults {
	access_token: string
	scope: string
	token_type: string
}

export interface GitHubAccessTokenResponse {
	accessToken: string
	results: GitHubAccessTokenResults
}

export interface GitHubPrivateUser {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string | null
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
	name: string | null
	company: string | null
	blog: string | null
	location: string | null
	email: string | null
	hireable: boolean | null
	bio: string | null
	twitter_username?: string | null
	public_repos: number
	public_gists: number
	followers: number
	following: number
	created_at: string
	updated_at: string
	private_gists: number
	total_private_repos: number
	owned_private_repos: number
	disk_usage: number
	collaborators: number
	two_factor_authentication: boolean
	plan?: {
		collaborators: number
		name: string
		space: number
		private_repos: number
		[k: string]: unknown
	}
	suspended_at?: string | null
	business_plus?: boolean
	ldap_dn?: string
	[k: string]: unknown
}

export interface GitHubPublicUser {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string | null
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
	name: string | null
	company: string | null
	blog: string | null
	location: string | null
	email: string | null
	hireable: boolean | null
	bio: string | null
	twitter_username?: string | null
	public_repos: number
	public_gists: number
	followers: number
	following: number
	created_at: string
	updated_at: string
	plan?: {
		collaborators: number
		name: string
		space: number
		private_repos: number
		[k: string]: unknown
	}
	suspended_at?: string | null
	private_gists?: number
	total_private_repos?: number
	owned_private_repos?: number
	disk_usage?: number
	collaborators?: number
}

export interface GitHubCollaborator {
	login: string
	id: number
	email?: string | null
	name?: string | null
	node_id: string
	avatar_url: string
	gravatar_id: string | null
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
	permissions?: {
		pull: boolean
		triage?: boolean
		push: boolean
		maintain?: boolean
		admin: boolean
		[k: string]: unknown
	}
	role_name: string
	[k: string]: unknown
}

export interface GitHubRepositoryCollaboratorPermission {
	permission: string
	role_name: string
	user: null | GitHubCollaborator
	[k: string]: unknown
}
