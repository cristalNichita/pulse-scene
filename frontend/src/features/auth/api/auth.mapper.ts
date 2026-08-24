import type { UserApi } from "@/features/auth/api/auth-api.types";
import type { AuthUser } from "@/features/auth/types/auth-user";

export function mapAuthUser(
    user: UserApi,
): AuthUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
    };
}