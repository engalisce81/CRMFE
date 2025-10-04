import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FinishService, FinishDto, CreateUpdateFinishDto } from '@proxy/finishes';

@Component({
  selector: 'app-update-finish',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './update-finish.component.html',
  styleUrl: './update-finish.component.scss'
})
export class UpdateFinishComponent {
finishForm: FormGroup;
  loading = false;
  finishId!: string;

  constructor(
    private fb: FormBuilder,
    private finishService: FinishService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.finishForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.finishId = this.route.snapshot.paramMap.get('id')!;
    if (this.finishId) {
      this.loadFinish();
    }
  }

  loadFinish(): void {
    this.loading = true;
    this.finishService.get(this.finishId).subscribe({
      next: (res) => {
        this.finishForm.patchValue({
          name: res.data.name
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load finish:', err);
        this.loading = false;
        alert('Error loading finish details.');
        this.router.navigate(['/finishes']);
      }
    });
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

    this.finishService.update(this.finishId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/finishes']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update finish:', err);
        alert('Error updating finish: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }

}
