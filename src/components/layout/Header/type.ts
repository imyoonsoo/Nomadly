export type User = {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
};

export type HeaderProps = {
  user: User | null;
};

export type AuthLink = {
  href: string;
  text: string;
};
