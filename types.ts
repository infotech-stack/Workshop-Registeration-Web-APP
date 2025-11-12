
export interface Student {
  id: string;
  name: string;
  phone: string;
  college: string;
  department: string;
  year: string;
}

export enum View {
  HOME = 'HOME',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  CERTIFICATE = 'CERTIFICATE'
}
