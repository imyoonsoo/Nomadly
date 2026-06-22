export interface ProfileEditFormValues {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface MyProfileRequestBody {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
}

export interface MyProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MyProfileImageResponse {
  profileImageUrl: string;
}
