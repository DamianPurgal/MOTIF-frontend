import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationMessage} from "./interfaces/notification-message";
import {NotificationType} from "./enums/notification-type";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  displayNotification(notification: NotificationMessage, type : NotificationType) {
    var style = 'snackbar';
    if (type === NotificationType.WARNING) {
      style = 'notification-error';
    }

    this.snackBar.open(
      notification.message,
      'OK',
      {
        duration: 3000,
        panelClass: [style, 'notification-margin'],
        horizontalPosition: "right",
        verticalPosition: "top",
      }
    );
  }
}
