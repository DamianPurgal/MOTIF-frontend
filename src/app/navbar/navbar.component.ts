import { Component } from '@angular/core';
import {JwtAuthService} from "../service/authentication/jwt-auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public jwtAuthService : JwtAuthService) {
  }

  logout() {
    this.jwtAuthService.logoutUser();
  }

}
