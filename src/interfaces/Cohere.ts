export interface CohereExampleGithubIssue {
	text: string
	label: string
}

export interface CohereClasifyRequestParams {
	inputs: string[]
	examples: CohereExampleGithubIssue[]
}

export interface Confidence {
	confidence: number
}

export interface Labels {
	[key: string]: Confidence
}

export interface CohereClassification {
	id: string
	input: string
	prediction: string
	confidence: number
	labels: Labels
}

export interface ApiClassifyResponse {
	id: string
	classifications: CohereClassification[]
}
