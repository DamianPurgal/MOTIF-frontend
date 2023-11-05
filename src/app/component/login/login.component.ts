import {Component, ElementRef, ViewChild} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {JwtToken} from "../../service/authentication/interfaces/jwt-token";
import {JwtAuthService} from "../../service/authentication/jwt-auth.service";
import {NotificationService} from "../../service/notification/notification.service";
import {Router} from "@angular/router";
import {NotificationType} from "../../service/notification/enums/notification-type";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent {
  @ViewChild('usernameInput')
  private usernameInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('passwordInput')
  private passwordInputElement!: ElementRef<HTMLInputElement>;

  private jwtToken!: Observable<JwtToken>;

  passwordHide = true;

  isLoading: boolean = false;

  constructor(private jwtAuthService: JwtAuthService, private notificationService: NotificationService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.jwtAuthService.authenticate(
      this.usernameInputElement.nativeElement.value,
      this.passwordInputElement.nativeElement.value
    ).pipe(
      tap(() => (this.isLoading = false)),
      catchError((error) => {
        this.isLoading = false;
        this.notificationService.displayNotification(
          {
            message: "Authentication failed. Wrong username or password!",
          },
          NotificationType.WARNING
        );
        throw new Error("Auth error");
      })
    ).subscribe(Response =>
    {
      console.log(Response);
      this.router.navigate(['']);
      this.notificationService.displayNotification(
        {
          message: "Logged in"
        },
        NotificationType.INFO
      );
    });
  }

  ngOnInit(): void {
  }
}
