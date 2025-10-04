// src/app/services/login.service.ts
import { AuthService, ConfigStateService } from '@abp/ng.core';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorMessage$ = new BehaviorSubject<string>('');

  constructor(
    private authService: AuthService,
    private configState: ConfigStateService,
    private router: Router
  ) {}

  login(username: string, password: string, rememberMe = true): void {
    const parameters = {
      username,
      password,
      grant_type: 'password',
      client_id: 'Company_App',
      scope: 'offline_access Company',
    };

    this.authService
      .loginUsingGrant(
        'password',
        parameters,
        new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      )
      .then(token => {
        if (token?.access_token) {
          // ✅ التوكن محفوظ أوتوماتيك جوه OAuthService
          this.errorMessage$.next('');
                  window.location.reload();

          // ✅ حدث الـ ConfigState (يحمل بيانات المستخدم / الـ Tenant / إلخ)
          this.configState.refreshAppState().subscribe(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/']);
            });
          });
        }
      })
      .catch(err => {
        console.error('❌ Login failed', err);
        this.errorMessage$.next(
          err.error?.error_description || 'Login failed, please try again'
        );
      });
  }

  logout(): void {
    this.authService.logout(); // 👈 ينظف الـ OAuthStorage
    this.router.navigateByUrl('/login');
  }

  getAccessToken(): string | null {
    // ✅ يجيب التوكن من OAuthStorage مباشرة
    return this.authService.getAccessToken();
  }
}
