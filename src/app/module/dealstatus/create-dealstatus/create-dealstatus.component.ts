import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DealStatusService, CreateUpdateDealStatusDto } from '@proxy/deals';

@Component({
  selector: 'app-create-dealstatus',
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './create-dealstatus.component.html',
  styleUrl: './create-dealstatus.component.scss'
})
export class CreateDealstatusComponent {
  dealStatusForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dealStatusService: DealStatusService,
    private router: Router
  ) {
    this.dealStatusForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      points: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submit(): void {
    if (this.dealStatusForm.invalid) {
      Object.keys(this.dealStatusForm.controls).forEach(key => {
        this.dealStatusForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateDealStatusDto = this.dealStatusForm.value;
    this.loading = true;

    this.dealStatusService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dealstatuses']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create deal status:', err);
        alert('Error creating deal status: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
