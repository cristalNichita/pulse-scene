export interface UserApi {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export interface AuthUserResponse {
    data: UserApi;
}