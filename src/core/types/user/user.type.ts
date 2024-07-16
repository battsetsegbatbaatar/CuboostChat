export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: ROLES;
};

export enum ROLES {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  AGENCY = 'AGENCY',
  CREATOR = 'CREATOR'
}
