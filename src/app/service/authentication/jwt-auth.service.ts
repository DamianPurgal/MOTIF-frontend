import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {JwtToken} from "./interfaces/jwt-token";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private loginURL: string = 'http://localhost:8080/login'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  authenticate(username: string, password: string) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.loginURL, { username: username, password: password })
      .pipe(
        map(authData => {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("accessToken", "Bearer " + authData.accessToken);
          return authData;
        })
      );
  }

  isUserLogged() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logoutUser() {
    sessionStorage.removeItem("username");
  }
}
