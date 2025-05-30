export type User = {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  name?: string;
  createdAt?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
};