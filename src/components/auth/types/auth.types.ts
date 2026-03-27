export interface IFormValues {
  name: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
  ratingAvg?: number;
  confirmPassword: string;
  day: string;
  month: string;
  year: string;
}

export interface IUser {
  id: number;
  token?: string;
  avatar?: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
  images?: string[];
  posts?: string[];
  ratingAvg?: number;
  ratingCount?: number;
  folowers?: string[];
  folowing?: string[];
}
