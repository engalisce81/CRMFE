import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LeadService, LeadDto, CreateUpdateLeadDto } from '@proxy/leads';

@Component({
  selector: 'app-update-lead',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './update-lead.component.html',
  styleUrl: './update-lead.component.scss'
})
export class UpdateLeadComponent {
 leadForm: FormGroup;
  loading = false;
  leadId: string = '';

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.leadForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)],
      phoneNumber: ['', [Validators.maxLength(20)]],
      source: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.leadId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.leadId) {
      alert('Lead ID is missing');
      this.router.navigate(['/leads']);
      return;
    }
    
    this.loadLead();
  }

  loadLead(): void {
    this.loading = true;
    this.leadService.get(this.leadId).subscribe({
      next: (lead) => {
        this.populateForm(lead.data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load lead:', err);
        alert('Error loading lead: ' + (err.error?.message || err.message || 'Unknown error'));
        this.loading = false;
        this.router.navigate(['/leads']);
      }
    });
  }

  populateForm(lead: LeadDto): void {
    this.leadForm.patchValue({
      name: lead.name || '',
      description: lead.description || '',
      phoneNumber: lead.phoneNumber || '',
      source: lead.source || ''
    });
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

    this.leadService.update(this.leadId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/leads']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update lead:', err);
        alert('Error updating lead: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
