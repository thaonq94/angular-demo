export abstract class BaseModel {
    id?: string;
    public constructor(obj: any) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            (this as any)[key] = obj[key];
        }
      }
    }
  }

  