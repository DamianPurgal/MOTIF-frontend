import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtAuthService} from "../../../service/authentication/jwt-auth.service";
import {Alert, AlertService} from "../../../core/api/v1";
import {catchError, Subscription, tap} from "rxjs";
import {NotificationService} from "../../../service/notification/notification.service";
import {NotificationType} from "../../../service/notification/enums/notification-type";
import {animate, style, transition, trigger} from "@angular/animations";
import {PageEvent} from "@angular/material/paginator";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {AlertWebsocketService} from "../../../service/alert/alert-websocket.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-5%)', opacity: 0}),
          animate('120ms', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
      'enterAnimationLeft', [
        transition(':enter', [
          style({transform: 'translateX(-10%) translateY(-10%)', opacity: 0}),
          animate('320ms', style({transform: 'translateX(0) translateY(0)', opacity: 1}))
        ])
      ]
    ),
    trigger('alertAnimationRotate', [
      transition('false => true', [
        style({transform: 'rotate(0.1turn)', opacity: 0}),
        animate('120ms', style({transform: 'rotate(0)', opacity: 1}))
      ]),
      transition('true => false', [
        style({transform: 'rotate(0.1turn)', opacity: 0}),
        animate('120ms', style({transform: 'rotate(0)', opacity: 1}))
      ])
    ]),
    trigger('alertAnimationChangeColor', [
      transition('false => true', [
        style({color: "#eeeeee", opacity: 0, transform: 'rotate(0.05turn)'}),
        animate('300ms', style({transform: "white", opacity: 1}))
      ]),
      transition('false => true', [
        style({color: "#eeeeee", opacity: 0, transform: 'rotate(0.05turn)'}),
        animate('300ms', style({transform: "white", opacity: 1}))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  newAlerts: Array<Alert> = [];
  alerts: Array<Alert> = [];
  isLoadingNewAlerts: boolean = false;
  isLoadingNewAlertsAmount: boolean = false;
  isLoadingAlerts: boolean = false;
  newAlertsAmount: number = 0;
  activeTab: number = 0;
  newAlertSubscription!: Subscription;
  alertAnimationRotate: boolean = false;
  alertAnimationChangeColor: boolean = false;
  alertsWindowOpened = false;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public jwtAuthService: JwtAuthService,
    public alertService: AlertService,
    public notificationService: NotificationService,
    public alertWebsocketService: AlertWebsocketService
  ) {
  }

  connectToWebsocket() {
    this.newAlertSubscription = this.alertWebsocketService.getNewAlertSubscription()
      .subscribe((alert: Alert) => {
        if (this.alertsWindowOpened && this.activeTab == 0) {
          this.alertAnimationChangeColor = !this.alertAnimationChangeColor;
          this.loadUnreadAlertsAndAddToTab();
        } else {
          this.newAlertsAmount += 1;
          this.alertAnimationRotate = !this.alertAnimationRotate;
        }
      });

  }

  ngOnInit(): void {
    this.connectToWebsocket();

    this.alertService.getAlertStatisticsOfUser()
      .pipe(
        tap(() => (this.isLoadingNewAlertsAmount = true)),
        catchError((error) => {
          this.isLoadingNewAlertsAmount = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching new alerts");
        })
      ).subscribe(Response => {
      this.newAlertsAmount = Response.unreadAlerts!;
      this.isLoadingNewAlertsAmount = false;
    });
  }

  ngOnDestroy(): void {
    this.newAlertSubscription.unsubscribe();
  }

  alertsOpened() {
    this.loadUnreadAlerts();
    this.loadFirstPage();

    if (this.activeTab === 0) {
      this.newAlertsAmount = 0;
    }
  }

  alertsOpenStateChanged(state: boolean) {
    this.alertsWindowOpened = state;
  }

  loadUnreadAlertsAndAddToTab() {
    this.alertService.getAllUnreadAlertsOfUser()
      .pipe(
        tap(() => (this.isLoadingNewAlerts = true)),
        catchError((error) => {
          this.isLoadingNewAlerts = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching new alerts");
        })
      ).subscribe(Response => {
      Response.forEach(alert => {
        this.newAlerts.push(alert);
      });
      this.newAlertsAmount = 0;
      this.isLoadingNewAlerts = false;
    });
  }

  loadUnreadAlerts() {
    this.alertService.getAllUnreadAlertsOfUser()
      .pipe(
        tap(() => (this.isLoadingNewAlerts = true)),
        catchError((error) => {
          this.isLoadingNewAlerts = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching new alerts");
        })
      ).subscribe(Response => {
      this.newAlerts = Response;
      this.isLoadingNewAlerts = false;
    });
  }

  loadFirstPage() {
    this.alertService.getAlertsOfUserPageable({page: 0, size: 10})
      .pipe(
        tap(() => (this.isLoadingAlerts = true)),
        catchError((error) => {
          this.isLoadingAlerts = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching new alerts");
        })
      ).subscribe(Response => {
      this.alerts = Response.alerts;
      this.length = Response.totalNumberOfElements;
      this.pageSize = 10;
      this.pageIndex = 0;
      this.isLoadingAlerts = false;
    });
  }

  logout() {
    this.jwtAuthService.logoutUser();
  }

  handlePageEvent(e: PageEvent) {
    this.alertService.getAlertsOfUserPageable({page: e.pageIndex, size: 10})
      .pipe(
        tap(() => (this.isLoadingAlerts = true)),
        catchError((error) => {
          this.isLoadingAlerts = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching new alerts");
        })
      ).subscribe(Response => {
      this.alerts = Response.alerts;
      this.length = Response.totalNumberOfElements;
      this.isLoadingAlerts = false;
    });

    this.pageEvent = e;
    this.pageSize = 10;
    this.pageIndex = e.pageIndex;

  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.loadUnreadAlerts();
      this.newAlertsAmount = 0;
    } else if (tabChangeEvent.index === 1) {
      this.loadFirstPage();
    }

    this.activeTab = tabChangeEvent.index;
  }

}
