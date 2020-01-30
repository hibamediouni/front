import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum AlertType {
  error   = "error",
  warning = "warning",
  info    = "info",
  success = "success",
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastrService: ToastrService) { }

  alert(type: AlertType, message: string, title?: string) {
    let config = {};
    if (type == AlertType.error || type == AlertType.warning) {
      config["disableTimeOut"] = true;
    }
    this.toastrService.show(message, title, config, "toast-" + type);
  }

  error(message: string, title?: string) {
    this.alert(AlertType.error, message, title);
  }

  warning(message: string, title?: string) {
    this.alert(AlertType.warning, message, title);
  }

  info(message: string, title?: string) {
    this.alert(AlertType.info, message, title);
  }

  success(message: string, title?: string) {
    this.alert(AlertType.success, message, title);
  }
}
