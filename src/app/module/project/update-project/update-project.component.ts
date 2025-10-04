import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService, ProjectDto, CreateUpdateProjectDto } from '@proxy/projects';

@Component({
  selector: 'app-update-project',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss'
})
export class UpdateProjectComponent {
  projectForm: FormGroup;
  loading = false;
  projectId: string = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(2000)],
      location: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.projectId) {
      alert('Project ID is missing');
      this.router.navigate(['/projects']);
      return;
    }
    
    this.loadProject();
  }

  loadProject(): void {
    this.loading = true;
    this.projectService.get(this.projectId).subscribe({
      next: (project) => {
        this.populateForm(project.data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load project:', err);
        alert('Error loading project: ' + (err.error?.message || err.message || 'Unknown error'));
        this.loading = false;
        this.router.navigate(['/projects']);
      }
    });
  }

  populateForm(project: ProjectDto): void {
    this.projectForm.patchValue({
      name: project.name || '',
      description: project.description || '',
      location: project.location || ''
    });
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

    this.projectService.update(this.projectId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update project:', err);
        alert('Error updating project: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
