import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/app/service/loginService';

@Component({
  selector: 'app-login',
  imports: [RouterLink ,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
username = '';
  password = '';
  rememberMe = true;

  constructor(private loginService: LoginService,private authService:AuthService) {}
  

  login() {
    this.loginService.login(this.username, this.password, this.rememberMe);
  }
}
