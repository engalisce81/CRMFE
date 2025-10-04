import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloorService, CreateUpdateFloorDto } from '@proxy/floors';

@Component({
  selector: 'app-create-floor',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-floor.component.html',
  styleUrl: './create-floor.component.scss'
})
export class CreateFloorComponent {
floorForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private floorService: FloorService,
    private router: Router
  ) {
    this.floorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      key: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  submit(): void {
    if (this.floorForm.invalid) {
      Object.keys(this.floorForm.controls).forEach(key => {
        this.floorForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateFloorDto = this.floorForm.value;
    this.loading = true;

    this.floorService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/floors']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create floor:', err);
        alert('Error creating floor: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
