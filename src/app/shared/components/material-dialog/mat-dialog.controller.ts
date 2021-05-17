import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef,
  Injectable,
  Injector
} from "@angular/core";
import {MatDialogTemplateComponent} from "./mat-dialog-template.component";
import {MatDialogOptions} from "./mat-dialog.interface";

@Injectable({providedIn: "root"})
export class MatDialogController {
  matDialogTemplateHost?: ComponentRef<MatDialogTemplateComponent>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this._injectModalContainer();
  }

  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  private _injectModalContainer() {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(MatDialogTemplateComponent).create(this.injector);

    this.applicationRef.attachView(componentRef.hostView);
    let componentRootNode = this.getComponentRootNode(componentRef);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    this.matDialogTemplateHost = componentRef;

    document.body.appendChild(componentRootNode);
  }

  create(options: MatDialogOptions): MatDialogTemplateComponent {
    if (!this.matDialogTemplateHost) {
      throw new Error('Mat Dialog Template not found');
    }

    this.matDialogTemplateHost.instance.create(options);

    return this.matDialogTemplateHost.instance;
  }

}
