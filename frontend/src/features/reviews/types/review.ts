export interface ReviewAuthor {
    id: number;
    name: string;
}

export interface Review {
    id: number;

    rating: number;
    body: string | null;

    author: ReviewAuthor;

    createdAt: string;
}