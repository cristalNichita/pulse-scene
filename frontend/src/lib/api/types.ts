export interface ApiPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface ApiPaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: ApiPaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PaginatedApiResponse<T> {
    data: T[];

    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };

    meta: ApiPaginationMeta;
}

export interface ApiDataResponse<T> {
    data: T;
}