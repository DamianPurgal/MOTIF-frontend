import {Component, Input} from '@angular/core';
import {Alert} from "../../core/api/v1";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() alert!: Alert;

}
