export interface ApiSearchParams {
    q?: string;
    sort?: 'followers' | 'repositories' | 'joined';
    order?: 'desc' | 'asc';
    per_page?: number;
    page?: number;
}

export interface ApiSearchResponseItem {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    received_events_url: string;
    type: string;
    score: number;
    following_url: string;
    gists_url: string;
    starred_url: string;
    events_url: string;
    site_admin: boolean;
}

export interface ApiSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: ApiSearchResponseItem[];
}
