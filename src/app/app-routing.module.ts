import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'user-details', component: UserPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
