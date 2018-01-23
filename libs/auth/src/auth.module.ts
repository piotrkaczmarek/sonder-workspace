import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

export const authRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LoginPageComponent]
})
export class AuthModule {
}
