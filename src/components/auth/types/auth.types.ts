export interface IFormValues {
  name: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  day: string;
  month: string;
  year: string;
}

export interface IUser {
  avatar?: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
}
