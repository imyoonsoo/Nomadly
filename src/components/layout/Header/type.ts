export type User = {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
};

export type HeaderProps = {
  user: User | null;
  isScrolled: boolean;
};

export type AuthLink = {
  href: string;
  text: string;
};
