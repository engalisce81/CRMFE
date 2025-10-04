import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateUpdateDealStatusDto, DealStatusService } from '@proxy/deals';

@Component({
  selector: 'app-update-dealstatus',
  imports: [ReactiveFormsModule ,RouterLink ,FormsModule],
  templateUrl: './update-dealstatus.component.html',
  styleUrl: './update-dealstatus.component.scss'
})
export class UpdateDealstatusComponent {
  dealStatusForm: FormGroup;
  loading = false;
  dealStatusId!: string;

  constructor(
    private fb: FormBuilder,
    private dealStatusService: DealStatusService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dealStatusForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      points: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.dealStatusId = this.route.snapshot.paramMap.get('id')!;
    if (this.dealStatusId) {
      this.loadDealStatus();
    }
  }

  loadDealStatus(): void {
    this.loading = true;
    this.dealStatusService.get(this.dealStatusId).subscribe({
      next: (res) => {
        this.dealStatusForm.patchValue({
          name: res.data.name,
          points: res.data.points
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load deal status:', err);
        this.loading = false;
        alert('Error loading deal status details.');
        this.router.navigate(['/deal-statuses']);
      }
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

    this.dealStatusService.update(this.dealStatusId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dealstatuses']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update deal status:', err);
        alert('Error updating deal status: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
