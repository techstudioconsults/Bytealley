export class Toast {
  private static instance: Toast;
  private toastFunction: ((properties: ExtendedToastProps) => void) | undefined;

  private constructor() {}

  public static getInstance(): Toast {
    if (!Toast.instance) {
      Toast.instance = new Toast();
    }
    return Toast.instance;
  }

  public initialize(toast: (properties: ExtendedToastProps) => void) {
    this.toastFunction = toast;
  }

  public showToast(properties: ExtendedToastProps) {
    if (this.toastFunction) {
      this.toastFunction(properties);
    }
    // else {
    //   console.warn("Toast function is not set up yet");
    // }
  }
}
