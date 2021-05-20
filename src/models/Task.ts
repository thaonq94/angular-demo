import { BaseModel } from "./Base-model";

export class Task extends BaseModel {
    id?: string;
    name?: string;
    description?: string;
    start?: Date | string;
    end?: Date | string;
    link?: string;
    image_urls?: Array<string>;
  }