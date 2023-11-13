import {Component, OnInit} from '@angular/core';
import {Alert, HelpRequest, HelpRequestAdd, HelpRequestService} from "../../core/api/v1";
import {catchError, tap} from "rxjs";
import {NotificationType} from "../../service/notification/enums/notification-type";
import {PageEvent} from "@angular/material/paginator";
import {NotificationService} from "../../service/notification/notification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-help-request',
  templateUrl: './help-request.component.html',
  styleUrls: ['./help-request.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-5%)', opacity: 0}),
          animate('120ms', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class HelpRequestComponent implements OnInit {

  dialogData: HelpRequestAdd = {
    description: ""
  }

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();
  helpRequests: Array<HelpRequest> = [];
  highlightedRequest?: HelpRequest;


  isLoadingHelpRequests: boolean = false;
  isLoadingAddRequest: boolean = false;
  addRequestForm!: FormGroup;

  constructor(public helpRequestService: HelpRequestService, public notificationService: NotificationService) {
    this.addRequestForm = new FormGroup({
      'description': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadFirstPage();
  }

  loadFirstPage() {
    this.helpRequestService.getHelpRequestsPageable({page: 0, size: 10})
      .pipe(
        tap(() => (this.isLoadingHelpRequests = true)),
        catchError((error) => {
          this.isLoadingHelpRequests = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching help requests");
        })
      ).subscribe(Response => {
      this.helpRequests = Response.requests;
      this.length = Response.totalNumberOfElements;
      this.isLoadingHelpRequests = false;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.helpRequestService.getHelpRequestsPageable({page: e.pageIndex, size: 10})
      .pipe(
        tap(() => (this.isLoadingHelpRequests = true)),
        catchError((error) => {
          this.isLoadingHelpRequests = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching help requests");
        })
      ).subscribe(Response => {
      this.helpRequests = Response.requests;
      this.length = Response.totalNumberOfElements;
      this.isLoadingHelpRequests = false;
    });
  }

  formSubmited() {
    this.helpRequestService.addHelpRequest(this.dialogData)
      .pipe(
        tap(() => (this.isLoadingAddRequest = true)),
        catchError((error) => {
          this.isLoadingAddRequest = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while adding help request");
        })
      ).subscribe(Response => {
      this.notificationService.displayNotification(
        {
          message: "Dodano zgłoszenie",
        },
        NotificationType.INFO
      );
      this.dialogData.description = "";
      this.loadFirstPage();
      this.isLoadingAddRequest = false;
    });

  }

  showRequest(request: HelpRequest) {
    this.highlightedRequest = request;

  }

  hideRequest() {
    this.highlightedRequest = undefined;
  }

}
