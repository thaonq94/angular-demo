import { BaseModel } from "./Base-model";

export class Task extends BaseModel {
    id?: string;
    name?: string;
    description?: string;
    start?: Date;
    end?: Date;
    link?: string;
    image_urls?: Array<string>;
  }