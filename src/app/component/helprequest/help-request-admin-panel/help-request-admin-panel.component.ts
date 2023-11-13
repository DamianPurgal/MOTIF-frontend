import {Component, OnInit} from '@angular/core';
import {HelpRequest, HelpRequestAdd, HelpRequestService} from "../../../core/api/v1";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../service/notification/notification.service";
import {catchError, tap} from "rxjs";
import {NotificationType} from "../../../service/notification/enums/notification-type";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-help-request-admin-panel',
  templateUrl: './help-request-admin-panel.component.html',
  styleUrls: ['./help-request-admin-panel.component.css'],
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
export class HelpRequestAdminPanelComponent implements OnInit {

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
  isLoadingEditRequest: boolean = false;
  addRequestForm!: FormGroup;

  formText: string = "";
  formType: HelpRequest.StatusEnum = HelpRequest.StatusEnum.New;

  constructor(public helpRequestService: HelpRequestService, public notificationService: NotificationService) {
    this.addRequestForm = new FormGroup({
      'description': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadFirstPage();
  }

  loadFirstPage() {
    this.helpRequestService.getHelpRequestsAdminPageable({page: 0, size: 10})
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
    this.helpRequestService.getHelpRequestsAdminPageable({page: e.pageIndex, size: 10})
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
    this.helpRequestService.editHelpRequest(this.highlightedRequest!.id!, {
      response: this.formText,
      status: this.formType
    })
      .pipe(
        tap(() => (this.isLoadingEditRequest = true)),
        catchError((error) => {
          this.isLoadingEditRequest = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message,
            },
            NotificationType.WARNING
          );
          throw new Error("Error while fetching edit request");
        })
      ).subscribe(Response => {
      this.highlightedRequest!.status = Response.status;
      this.highlightedRequest!.response = Response.response;
      this.isLoadingEditRequest = false;
    });
  }

  showRequest(request: HelpRequest) {
    this.highlightedRequest = request;
    this.formType = this.highlightedRequest.status!;
    this.formText = this.highlightedRequest.response!;
  }

  hideRequest() {
    this.highlightedRequest = undefined;
  }

  radioButtonStatusChanged(radioButtonChange: MatRadioChange) {
    this.formType = radioButtonChange.value;
  }

  protected readonly HelpRequest = HelpRequest;
}
