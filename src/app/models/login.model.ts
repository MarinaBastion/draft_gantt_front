export interface LoginModel {
    username?: string;
    password: string;
    email: string;
}
export interface AuthenticatedResponse{
    token: string;
}