import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FinishDto, FinishService } from '@proxy/finishes';

@Component({
  selector: 'app-list-finish',
  imports: [FormsModule ,RouterLink],
  templateUrl: './list-finish.component.html',
  styleUrl: './list-finish.component.scss'
})
export class ListFinishComponent {
finishes: FinishDto[] = [];
  loading = false;
  search = '';

  totalCount = 0;
  pageSize = 10;
  pageIndex = 1;

  showDeleteConfirm = false;
  finishToDelete!: FinishDto;

  constructor(
    private finishService: FinishService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFinishes();
  }

  loadFinishes(): void {
    this.loading = true;
    this.finishService.getList(this.pageIndex, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.finishes = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadFinishes();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadFinishes();
  }

  confirmDelete(finish: FinishDto): void {
    this.finishToDelete = finish;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.finishToDelete = null!;
  }

  deleteFinish(): void {
    if (!this.finishToDelete) return;

    this.finishService.delete(this.finishToDelete.id).subscribe({
      next: () => {
        this.loadFinishes();
        this.showDeleteConfirm = false;
        this.finishToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete finish:', error);
        this.showDeleteConfirm = false;
        this.finishToDelete = null!;
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
