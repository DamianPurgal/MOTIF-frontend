import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Alert, HelpRequest} from "../../../core/api/v1";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-help-request-element-in-list',
  templateUrl: './help-request-element-in-list.component.html',
  styleUrls: ['./help-request-element-in-list.component.css']
})
export class HelpRequestElementInListComponent {

  @Input()
  request : HelpRequest = {
    status: "NEW",
    id: 1,
    description: "---"
  }

  @Output() requestClickedEventEmitter = new EventEmitter<HelpRequest>();

  requestClicked() {
    this.requestClickedEventEmitter.emit(this.request);
  }

}
