import {MatDialogConfig} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";

export interface MatDialogOptions {
  /**
   * Use either component or template. DO NOT use them both
   */
  template?: {
    title: string;
    content: string;
  };

  /**
   * Use either component or template. DO NOT use them both
   */
  component?: ComponentType<any>;
  config?: MatDialogConfig;

  afterClosedCb: (data: any) => any;

  onConfirm?: (args?: any) => any;
  confirmTitle?: string;
  /**
   * String of CSS Selectors
   */
  confirmStyle?: string;

  onCancel?: (args?: any) => any;
  cancelTitle?: string;
  /**
   * String of CSS Selectors
   */
  cancelStyle?: string;

}
