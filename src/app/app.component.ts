import { Component } from '@angular/core';
import {JwtAuthService} from "./service/authentication/jwt-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'motifFrontend';
  constructor(public jwtAuthService: JwtAuthService) {
  }

}
