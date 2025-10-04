import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DealService, DealStatusService, DealDto, CreateUpdateDealDto } from '@proxy/deals';
import { LeadService } from '@proxy/leads';
import { LookupDto } from '@proxy/lookups';
import { UnitService } from '@proxy/units';

@Component({
  selector: 'app-update-deal',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './update-deal.component.html',
  styleUrl: './update-deal.component.scss'
})
export class UpdateDealComponent {
dealForm: FormGroup;
  loading = false;
  dealId!: string;

  leads: LookupDto[] = [];
  units: LookupDto[] = [];
  dealStatuses: LookupDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dealService: DealService,
    private leadService: LeadService,
    private unitService: UnitService,
    private dealStatusService: DealStatusService,
    private route: ActivatedRoute,
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
    this.dealId = this.route.snapshot.paramMap.get('id')!;

    this.loadLookups();
    this.loadDeal();
  }

  loadLookups(): void {
    this.leadService.getLeadsLookup().subscribe(res => this.leads = res.items || []);
    this.unitService.getUnitsLookup().subscribe(res => this.units = res.items || []);
    this.dealStatusService.getDealstatusLookup().subscribe(res => this.dealStatuses = res.items || []);
  }

  loadDeal(): void {
    this.dealService.get(this.dealId).subscribe((deal) => {
      this.dealForm.patchValue({
        leadId: deal.data.leadId,
        unitId: deal.data.unitId,
        dealStatusId: deal.data.dealStatusId,
        amount: deal.data.amount
      });
    });
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

    this.dealService.update(this.dealId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/deals']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update deal:', err);
        alert('Error updating deal: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
