
export interface AccountRequest {
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    password: string;
    role: string;
}

export interface UpdateAccountRequest {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    isActive: boolean;
}

export interface AccountDetailResponse {
    fullName: string;
    address: string;
    dateOfBirth: Date;
    isActive: boolean;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}


export interface RegisterRequest {
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    password: string;
}

export interface TokenDecode {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" : string;
    sub: string;
    exp: number;
    iss: string;
    aud: string;
}



export interface ConfirmEmailRequest {
    email: string;
    token: string;
}


export interface ForgotPasswordRequest{
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}
export  interface  ResetPasswordUserProfile{
    oldPassword: string;
    newPassword: string;
}

export interface UserProfile {
    id: string;
    fullName: string;
    userName: string;
    phoneNumber: string;
    email: string;
    address: string;
    dateOfBirth: string;
    imageUrl: string;
}

export interface UserProfileUpdate{
    id: string;
    fullName: string;
    userName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    imageUrl: string;
}


export interface WalletUser {
    walletId: number;
    userId : string;
    balance : number;
    totalRefunded : number;
    isAdminWallet : false;
    recentTransactions : string[];
}


