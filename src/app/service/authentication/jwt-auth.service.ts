import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {JwtToken} from "./interfaces/jwt-token";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RxStomp} from "@stomp/rx-stomp";
import {jwtDecode, JwtHeader, JwtPayload} from 'jwt-decode';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private loginURL: string = 'http://localhost:8080/login'

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private stomp: RxStomp, private router: Router) {
  }

  authenticate(username: string, password: string): Observable<JwtToken> {
    return this.http.post<JwtToken>(this.loginURL, {username: username, password: password})
      .pipe(
        map(authData => {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("accessToken", "Bearer " + authData.accessToken);
          sessionStorage.setItem("accessTokenWithoutPrefix", authData.accessToken);
          return authData;
        })
      );
  }

  isUserLogged(): boolean {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  isUserAdmin(): boolean {
    var decodedToken = jwtDecode(sessionStorage.getItem("accessTokenWithoutPrefix")!);
    var authorities = JSON.parse(JSON.stringify(decodedToken))["authorities"];
    for (let i = 0; i < authorities.length; i++) {
      if (authorities[i]['authority'] === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }

  logoutUser() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessTokenWithoutPrefix");
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
