import { Credentials } from './Credentials';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';

export type Users = {
  id: number;
};

export type RequestBodys = {
  data: Credentials | Prisma.EmployeesUncheckedCreateInput;
};
