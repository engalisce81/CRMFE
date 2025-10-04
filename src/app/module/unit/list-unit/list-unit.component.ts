import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UnitDto, UnitService, UnitTypeService } from '@proxy/units';
import { ProjectService } from '@proxy/projects';
import { FloorService } from '@proxy/floors';
import { LookupDto } from '@proxy/lookups';

@Component({
  selector: 'app-list-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './list-unit.component.html',
  styleUrl: './list-unit.component.scss'
})
export class ListUnitComponent implements OnInit {
  units: UnitDto[] = [];
  loading = false;
  search = '';

  // الفلاتر
  selectedUnitType: string = '';
  selectedProject: string = '';
  selectedFloor: string = '';
  
  // بيانات الفلاتر
  unitTypes: LookupDto[] = [];
  projects: LookupDto[] = [];
  floors: LookupDto[] = [];

  totalCount = 0;
  pageSize = 12;
  pageIndex = 1;

  showDeleteConfirm = false;
  unitToDelete!: UnitDto;

  constructor(
    private unitService: UnitService,
    private unitTypeService: UnitTypeService,
    private projectService: ProjectService,
    private floorService: FloorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUnits();
    this.loadFilterData();
  }

  loadUnits(): void {
    this.loading = true;
    
    // بناء استعلام البحث
    let searchQuery = this.search;
    if (this.selectedUnitType) {
      searchQuery += ` unitType:${this.selectedUnitType}`;
    }
    if (this.selectedProject) {
      searchQuery += ` project:${this.selectedProject}`;
    }
    if (this.selectedFloor) {
      searchQuery += ` floor:${this.selectedFloor}`;
    }

    this.unitService.getList(this.pageIndex, this.pageSize, searchQuery.trim()).subscribe({
      next: (res) => {
        this.units = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  loadFilterData(): void {
    // تحميل أنواع الوحدات
    this.unitTypeService.getUnittypesLookup().subscribe({
      next: (res) => this.unitTypes = res.items,
      error: (err) => console.error('Failed to load unit types:', err)
    });

    // تحميل المشاريع
    this.projectService.getProjectsLookup().subscribe({
      next: (res) => this.projects = res.items,
      error: (err) => console.error('Failed to load projects:', err)
    });

    // تحميل الطوابق
    this.floorService.getFloorsLookup().subscribe({
      next: (res) => this.floors = res.items,
      error: (err) => console.error('Failed to load floors:', err)
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadUnits();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadUnits();
  }

  confirmDelete(unit: UnitDto): void {
    this.unitToDelete = unit;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.unitToDelete = null!;
  }

  deleteUnit(): void {
    if (!this.unitToDelete) return;

    this.unitService.delete(this.unitToDelete.id).subscribe({
      next: () => {
        this.loadUnits();
        this.showDeleteConfirm = false;
        this.unitToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete unit:', error);
        this.showDeleteConfirm = false;
        this.unitToDelete = null!;
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.pageIndex - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  // Helper function for template
  Math = Math;
}