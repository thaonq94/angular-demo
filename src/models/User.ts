import { BaseModel } from "./Base-model";

export class User extends BaseModel {
    id?: string;
    email?: string;
    name?: string;
    phone?: string;
    position?: string;
    status?: string;
  }