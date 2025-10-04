import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {  ProjectService, CreateUpdateProjectDto } from '@proxy/projects';

@Component({
  selector: 'app-create-project',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
 projectForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(2000)],
      location: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  submit(): void {
    if (this.projectForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.projectForm.controls).forEach(key => {
        this.projectForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateProjectDto = this.projectForm.value;
    this.loading = true;

    this.projectService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create project:', err);
        alert('Error creating project: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
