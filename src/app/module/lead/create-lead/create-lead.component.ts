import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeadService, CreateUpdateLeadDto } from '@proxy/leads';

@Component({
  selector: 'app-create-lead',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './create-lead.component.html',
  styleUrl: './create-lead.component.scss'
})
export class CreateLeadComponent {
leadForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private router: Router
  ) {
    this.leadForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)],
      phoneNumber: ['', [Validators.maxLength(20)]],
      source: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  submit(): void {
    if (this.leadForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.leadForm.controls).forEach(key => {
        this.leadForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateLeadDto = this.leadForm.value;
    this.loading = true;

    this.leadService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/leads']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create lead:', err);
        alert('Error creating lead: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
