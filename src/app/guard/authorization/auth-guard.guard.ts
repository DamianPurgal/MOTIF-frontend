import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtAuthService } from "../../service/authentication/jwt-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtAuthService: JwtAuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authRequired = route.data['authRequired'] || false;

    if (authRequired) {
      if (!this.jwtAuthService.isUserLogged()) {
        this.router.navigate(['login']);
        return false;
      }
    }
    return true;
  }

}
