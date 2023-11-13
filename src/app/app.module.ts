import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NavbarComponent} from './component/navbar/navbar/navbar.component';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationService} from "./service/authorization/authorization.service";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AlertComponent} from './component/alert/alert.component';
import {MatCardModule} from '@angular/material/card';
import {RxStomp} from "@stomp/rx-stomp";
import {environment} from 'src/environments/environment';
import {
  NavbarUnauthenticatedComponent
} from './component/navbar/navbar-unauthenticated/navbar-unauthenticated.component';
import {AlertPipe} from './pipe/alert.pipe';
import { HelpRequestComponent } from './component/helprequest/help-request.component';
import { HelpRequestElementInListComponent } from './component/helprequest/help-request-element-in-list/help-request-element-in-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import { HelpRequestAdminPanelComponent } from './component/helprequest/help-request-admin-panel/help-request-admin-panel.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    TestComponent,
    LoginComponent,
    MainComponent,
    AlertComponent,
    NavbarUnauthenticatedComponent,
    AlertPipe,
    HelpRequestComponent,
    HelpRequestElementInListComponent,
    HelpRequestAdminPanelComponent
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
    MatSnackBarModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthorizationService, multi: true
    },
    {
      provide: RxStomp,
      useFactory: () => {
        const rxStomp = new RxStomp();
        rxStomp.configure({
          brokerURL: environment.wsUrl,
          connectHeaders: {
            Authorization: sessionStorage.getItem('accessToken')!
          },
          beforeConnect: client => {
            console.log(client.stompClient.connectHeaders);
          }
        });
        rxStomp.activate();
        return rxStomp;
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
