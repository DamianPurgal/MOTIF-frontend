import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {TestComponent} from "./component/test/test.component";
import {AuthGuard} from "./guard/authorization/auth-guard.guard";
import {LoginComponent} from "./component/login/login.component";
import {MainComponent} from "./component/main/main.component";
import {HelpRequestComponent} from "./component/helprequest/help-request.component";
import {
  HelpRequestAdminPanelComponent
} from "./component/helprequest/help-request-admin-panel/help-request-admin-panel.component";



const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent, data: {authRequired: true}, canActivate: [AuthGuard]},
  { path: 'helpRequest', component: HelpRequestComponent, data: {authRequired: true}, canActivate: [AuthGuard]},
  { path: 'admin/helpRequest', component: HelpRequestAdminPanelComponent, data: {authRequired: true, adminRequired: true}, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
