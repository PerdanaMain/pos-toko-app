import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Inventory {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  name: string;
  id: string;
  inventoryId: string | null;
  description: string | null;
  price: number | null;
  image: string | null;
  stock: number | null;
  inventory: Inventory | null;
  createdAt: Date;
  updatedAt: Date;
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

export interface IInventoryPayload {
  name: string;
  description: string;
}

export interface IProductPayload {
  name: string;
  price: number;
  description: string;
  stock: number;
  inventoryId: string;
}

export interface IUserToken extends Request {
  token: string | JwtPayload;
}
