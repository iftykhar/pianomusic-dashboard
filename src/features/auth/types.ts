// auth types 
export interface User {
    _id: string;
    email: string;
    role: string;
    profileImage: string;
    refreshToken: string;
    resetToken: string;
    resetTokenExpiry: string;
    updatedAt: string;
}

export interface LoginData {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginData;
}

export interface ForgotPasswordFormData {
    email: string;
}

export interface VerifyCodeFormData {
    resetEmail: string;
    otp: number;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}