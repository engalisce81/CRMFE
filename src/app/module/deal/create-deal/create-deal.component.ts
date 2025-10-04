import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DealService, DealStatusService, CreateUpdateDealDto } from '@proxy/deals';
import { LeadService } from '@proxy/leads';
import { LookupDto } from '@proxy/lookups';
import { UnitService } from '@proxy/units';

@Component({
  selector: 'app-create-deal',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './create-deal.component.html',
  styleUrl: './create-deal.component.scss'
})
export class CreateDealComponent implements OnInit {
dealForm: FormGroup;
  loading = false;

  leads: LookupDto[] = [];
  units: LookupDto[] = [];
  dealStatuses: LookupDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dealService: DealService,
    private leadService: LeadService,
    private unitService: UnitService,
    private dealStatusService: DealStatusService,
    private router: Router
  ) {
    this.dealForm = this.fb.group({
      leadId: ['', Validators.required],
      unitId: ['', Validators.required],
      dealStatusId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadLookups();
  }

  loadLookups(): void {
    this.leadService.getLeadsLookup().subscribe(res => this.leads = res.items || []);
    this.unitService.getUnitsLookup().subscribe(res => this.units = res.items || []);
    this.dealStatusService.getDealstatusLookup().subscribe(res => this.dealStatuses = res.items || []);
  }

  submit(): void {
    if (this.dealForm.invalid) {
      Object.keys(this.dealForm.controls).forEach(key => {
        this.dealForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateDealDto = this.dealForm.value;
    this.loading = true;

    this.dealService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/deals']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create deal:', err);
        alert('Error creating deal: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }

}
