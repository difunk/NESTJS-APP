export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export type Users = User[];
