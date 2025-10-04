import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloorDto, FloorService } from '@proxy/floors';

@Component({
  selector: 'app-list-floor',
  imports: [FormsModule ,RouterLink],
  templateUrl: './list-floor.component.html',
  styleUrl: './list-floor.component.scss'
})
export class ListFloorComponent {
floors: FloorDto[] = [];
  loading = false;
  search = '';

  totalCount = 0;
  pageSize = 10;
  pageIndex = 1;

  showDeleteConfirm = false;
  floorToDelete!: FloorDto;

  constructor(
    private floorService: FloorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFloors();
  }

  loadFloors(): void {
    this.loading = true;
    this.floorService.getList(this.pageIndex, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.floors = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadFloors();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadFloors();
  }

  confirmDelete(floor : FloorDto): void {
    this.floorToDelete = floor;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.floorToDelete = null!;
  }

  deleteFloor(): void {
    if (!this.floorToDelete) return;

    this.floorService.delete(this.floorToDelete.id).subscribe({
      next: () => {
        this.loadFloors();
        this.showDeleteConfirm = false;
        this.floorToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete floor:', error);
        this.showDeleteConfirm = false;
        this.floorToDelete = null!;
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
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  Math = Math;
}
