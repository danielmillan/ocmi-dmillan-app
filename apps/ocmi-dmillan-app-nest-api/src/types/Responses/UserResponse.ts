export type UserResponse = {
  id: number;
  customer: {
    id: number;
    name: string;
  } | null;
  role: {
    id: number;
    name: string;
  } | null;
  name: string;
  lastName: string;
  email: string;
  isActive: boolean;
};
