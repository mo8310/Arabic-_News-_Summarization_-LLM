export interface SummarizeRequest {
    article: string;
}

export interface SummarizeResponse {
    summary: string[];
}

export interface HealthResponse {
    status: string;
    model_loaded: boolean;
}
