import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterCustomDto, RegisterCustomService } from '@proxy/account-customs';
import { LookupDto } from '@proxy/lookups';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerDto: RegisterCustomDto = {
    fullName: '',
    userName: '',
    password: '',
    gender: true,
    accountTypeKey: 0
  };

  accountTypes: LookupDto[] = [];
  errorMessage: string = '';

  constructor(
    private accountService: RegisterCustomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccountTypes();
  }

  loadAccountTypes() {
    this.accountService.getAccountTypes().subscribe({
      next: (res) => {
        this.accountTypes = res.items;
      },
      error: (err) => {
        console.error('❌ Failed to load account types', err);
      }
    });
  }

  register() {
    this.accountService.register(this.registerDto).subscribe({
      next: () => {
        alert('✅ Register success');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error('❌ Register failed', err);
        this.errorMessage = err.error?.message || 'Register failed';
      }
    });
  }
}
