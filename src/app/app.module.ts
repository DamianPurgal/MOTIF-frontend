import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {TestComponent} from './component/test/test.component';
import {LoginComponent} from './component/login/login.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MainComponent} from './component/main/main.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthorizationService} from "./service/authorization/authorization.service";
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    TestComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthorizationService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
