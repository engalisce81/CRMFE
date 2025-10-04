import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FinishService, CreateUpdateFinishDto } from '@proxy/finishes';

@Component({
  selector: 'app-create-finish',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './create-finish.component.html',
  styleUrl: './create-finish.component.scss'
})
export class CreateFinishComponent {
finishForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private finishService: FinishService,
    private router: Router
  ) {
    this.finishForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  submit(): void {
    if (this.finishForm.invalid) {
      Object.keys(this.finishForm.controls).forEach(key => {
        this.finishForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateFinishDto = this.finishForm.value;
    this.loading = true;

    this.finishService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/finishes']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create finish:', err);
        alert('Error creating finish: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
