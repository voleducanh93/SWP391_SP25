export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    message: string;
}

export interface RegisterRequest {
    email: string;
    confirmPassword: string;
    username: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    doB: string; 
}

export interface RegisterResponse {
    message: string;
}

export interface TokenDecode {
    token: string;
    
}