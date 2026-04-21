export interface Avatar {
  public_id: string;
  url: string;
  duration?: number | null;
  file_type?: string;
}

export interface VerificationInfo {
  verified: boolean;
  verificationOtp?: string | null;
}

export interface Member {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: "user" | "admin" | string;
  avatar?: Avatar;
  verificationInfo?: VerificationInfo;
  age?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  message: string;
  data: Member[];
}

export interface BulkRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    created: string[];
    alreadyExists: string[];
    failed: string[];
  };
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data: Member;
}
