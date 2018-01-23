import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

export const authRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LoginPageComponent]
})
export class AuthModule {
}
