import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('accessToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('accessToken') || ''
        }
      });
    }

    return next.handle(req);
  }
}
