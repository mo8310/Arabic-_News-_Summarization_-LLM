import axios from 'axios';
import type { SummarizeRequest, SummarizeResponse, HealthResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkHealth = async (): Promise<HealthResponse> => {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
};

export const summarizeArticle = async (request: SummarizeRequest): Promise<SummarizeResponse> => {
    const response = await api.post<SummarizeResponse>('/summarize', request);
    return response.data;
};
