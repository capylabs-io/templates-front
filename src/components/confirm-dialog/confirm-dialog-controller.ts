import { action, observable } from "mobx";
import _ from "lodash";

export interface ConfirmDialogConfig {
  content?: string;
  title?: string;
  doneText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  hideDone?: boolean;
  doneCallback?: any;
  cancelCallback?: any;
  showWarningIcon?: boolean;
  warningIconColor?: string;
}

export class ConfirmDialogController {
  @observable config: ConfirmDialogConfig = {
    hideCancel: false,
    hideDone: false,
    doneText: "Done",
    cancelText: "Cancel",
    showWarningIcon: true,
    warningIconColor: "error",
  };
  @observable dialog = false;

  @action.bound done() {
    if (this.config.doneCallback) this.config.doneCallback();
    this.dialog = false;
  }
  @action.bound cancel() {
    if (this.config.cancelCallback) this.config.cancelCallback();
    this.dialog = false;
  }
  @action.bound confirm(config: any) {
    this.config = { ...this.config, ...config };
    this.dialog = true;
  }
}

export const confirmDialogController = new ConfirmDialogController();
