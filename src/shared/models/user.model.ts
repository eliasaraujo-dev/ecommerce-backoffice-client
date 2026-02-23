export type UserRole = 'ADMIN' | 'MANAGER' | 'VIEWER';

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    accessToken: string;
}