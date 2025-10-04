import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DealStatusDto, DealStatusService } from '@proxy/deals';

@Component({
  selector: 'app-list-dealstatus',
  imports: [FormsModule ,RouterLink],
  templateUrl: './list-dealstatus.component.html',
  styleUrl: './list-dealstatus.component.scss'
})
export class ListDealstatusComponent {
dealStatuses: DealStatusDto[] = [];
  loading = false;
  search = '';

  totalCount = 0;
  pageSize = 10;
  pageIndex = 1;

  showDeleteConfirm = false;
  dealStatusToDelete!: DealStatusDto;

  constructor(
    private dealStatusService: DealStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDealStatuses();
  }

  loadDealStatuses(): void {
    this.loading = true;
    this.dealStatusService.getList(this.pageIndex, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.dealStatuses = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadDealStatuses();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadDealStatuses();
  }

  confirmDelete(status: DealStatusDto): void {
    this.dealStatusToDelete = status;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.dealStatusToDelete = null!;
  }

  deleteDealStatus(): void {
    if (!this.dealStatusToDelete) return;

    this.dealStatusService.delete(this.dealStatusToDelete.id).subscribe({
      next: () => {
        this.loadDealStatuses();
        this.showDeleteConfirm = false;
        this.dealStatusToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete deal status:', error);
        this.showDeleteConfirm = false;
        this.dealStatusToDelete = null!;
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
