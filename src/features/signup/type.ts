export interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export interface SignupRequestBody {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface NomadlyTermsAgreementValues extends SignupFormValues {
  checkAll?: boolean;
  checkService?: boolean;
  checkPrivacy?: boolean;
}
