import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FinishService } from '@proxy/finishes';
import { FloorService } from '@proxy/floors';
import { LookupDto } from '@proxy/lookups';
import { MediaItemService } from '@proxy/media-items';
import { ProjectService } from '@proxy/projects';
import { UnitService, UnitTypeService, UnitDto, CreateUpdateUnitDto } from '@proxy/units';

@Component({
  selector: 'app-update-unit',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './update-unit.component.html',
  styleUrl: './update-unit.component.scss'
})
export class UpdateUnitComponent {
unitForm: FormGroup;
  loading = false;
  unitId: string = '';

  projects: LookupDto[] = [];
  floors: LookupDto[] = [];
  finishes: LookupDto[] = [];
  unitTypes: LookupDto[] = [];

  uploadingImage = false;
  logoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private projectService: ProjectService,
    private floorService: FloorService,
    private finishService: FinishService,
    private unitTypeService: UnitTypeService,
    private mediaService: MediaItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.unitForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      code: ['', Validators.maxLength(50)],
      bedroomCount: [0, [Validators.required, Validators.min(0)]],
      bedroomDescription: ['', Validators.maxLength(200)],
      bathroomCount: [0, [Validators.required, Validators.min(0)]],
      bathroomDescription: ['', Validators.maxLength(200)],
      ownerName: ['', Validators.maxLength(100)],
      ownerPhoneNumber: ['', Validators.maxLength(20)],
      notes: ['', Validators.maxLength(500)],
      area: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.maxLength(200)],
      stateless: [false],
      isCompany: [false],
      floorId: ['', Validators.required],
      unitTypeId: ['', Validators.required],
      projectId: ['', Validators.required],
      finishId: ['', Validators.required],
      logoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.unitId) {
      alert('Unit ID is missing');
      this.router.navigate(['/units']);
      return;
    }
    
    this.loadLookups();
    this.loadUnit();
  }

  loadUnit(): void {
    this.loading = true;
    this.unitService.get(this.unitId).subscribe({
      next: (unit) => {
        this.populateForm(unit.data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load unit:', err);
        alert('Error loading unit: ' + (err.error?.message || err.message || 'Unknown error'));
        this.loading = false;
        this.router.navigate(['/units']);
      }
    });
  }

  populateForm(unit: UnitDto): void {
    this.unitForm.patchValue({
      name: unit.name || '',
      description: unit.description || '',
      code: unit.code || '',
      bedroomCount: unit.bedroomCount || 0,
      bedroomDescription: unit.bedroomDescription || '',
      bathroomCount: unit.bathroomCount || 0,
      bathroomDescription: unit.bathroomDescription || '',
      ownerName: unit.ownerName || '',
      ownerPhoneNumber: unit.ownerPhoneNumber || '',
      notes: unit.notes || '',
      area: unit.area || 0,
      price: unit.price || 0,
      location: unit.location || '',
      stateless: unit.stateless || false,
      isCompany: unit.isCompany || false,
      floorId: unit.floorId || '',
      unitTypeId: unit.unitTypeId || '',
      projectId: unit.projectId || '',
      finishId: unit.finishId || '',
      logoUrl: unit.logoUrl || ''
    });

    // Set logo preview if exists
    if (unit.logoUrl) {
      this.logoPreview = unit.logoUrl;
    }
  }

  loadLookups() {
    this.projectService.getProjectsLookup().subscribe({ 
      next: res => this.projects = res.items,
      error: err => console.error('Failed to load projects:', err)
    });
    
    this.floorService.getFloorsLookup().subscribe({ 
      next: res => this.floors = res.items,
      error: err => console.error('Failed to load floors:', err)
    });
    
    this.finishService.getFinishesLookup().subscribe({ 
      next: res => this.finishes = res.items,
      error: err => console.error('Failed to load finishes:', err)
    });
    
    this.unitTypeService.getUnittypesLookup().subscribe({ 
      next: res => this.unitTypes = res.items,
      error: err => console.error('Failed to load unit types:', err)
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    this.selectedFile = file;
    this.uploadingImage = true;

    // Preview
    const reader = new FileReader();
    reader.onload = () => this.logoPreview = reader.result;
    reader.readAsDataURL(file);

    // Upload to server
    this.mediaService.uploadImage(file).subscribe({
      next: (res) => {
        this.unitForm.patchValue({ logoUrl: res.data });
        this.uploadingImage = false;
      },
      error: (err) => {
        console.error('Image upload failed', err);
        this.uploadingImage = false;
        this.logoPreview = null;
        this.selectedFile = null;
        alert('Failed to upload image. Please try again.');
      }
    });
  }

  removeLogo() {
    this.logoPreview = null;
    this.selectedFile = null;
    this.unitForm.patchValue({ logoUrl: '' });
  }

  submit() {
    if (this.unitForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.unitForm.controls).forEach(key => {
        this.unitForm.get(key)?.markAsTouched();
      });
      return;
    }

    const dto: CreateUpdateUnitDto = this.unitForm.value;
    this.loading = true;

    this.unitService.update(this.unitId, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/units']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to update unit:', err);
        alert('Error updating unit: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
