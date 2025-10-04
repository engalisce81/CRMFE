import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorService, CreateUpdateFloorDto } from '@proxy/floors';

@Component({
  selector: 'app-update-floor',
  imports: [ReactiveFormsModule ],
  templateUrl: './update-floor.component.html',
  styleUrl: './update-floor.component.scss'
})
export class UpdateFloorComponent implements OnInit{
 floorForm: FormGroup;
  loading = false;
  floorId!: string;

  constructor(
    private fb: FormBuilder,
    private floorService: FloorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.floorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      key: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.floorId = this.route.snapshot.paramMap.get('id')!;
    if (this.floorId) {
      this.loadFloor();
    }
  }

  loadFloor(): void {
    this.loading = true;
    this.floorService.get(this.floorId).subscribe({
      next: (res) => {
        this.floorForm.patchValue({
          name: res.data.name,
          key: res.data.key
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load floor:', err);
        this.loading = false;
        alert('Error loading floor details.');
        this.router.navigate(['/floors']);
      }
    });
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

    this.floorService.update(this.floorId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/floors']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update floor:', err);
        alert('Error updating floor: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
