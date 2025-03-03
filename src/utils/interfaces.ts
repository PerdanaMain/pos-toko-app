export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IToken {
  id: string;
  iat: number;
  exp: number;
}

export interface ILoginResponse {
  admin: Admin;
  token: string;
}
