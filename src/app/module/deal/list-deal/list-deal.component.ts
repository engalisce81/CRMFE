import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DealDto, DealService } from '@proxy/deals';

@Component({
  selector: 'app-list-deal',
  imports: [FormsModule ,RouterLink],
  templateUrl: './list-deal.component.html',
  styleUrl: './list-deal.component.scss'
})
export class ListDealComponent {
deals: DealDto[] = [];
  loading = false;
  search = '';

  totalCount = 0;
  pageSize = 10;
  pageIndex = 1;

  showDeleteConfirm = false;
  dealToDelete!: DealDto;

  constructor(
    private dealService: DealService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals(): void {
    this.loading = true;
    this.dealService.getList(this.pageIndex, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.deals = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadDeals();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadDeals();
  }

  confirmDelete(deal:DealDto): void {
    this.dealToDelete = deal;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.dealToDelete = null!;
  }

  deleteDeal(): void {
    if (!this.dealToDelete) return;

    this.dealService.delete(this.dealToDelete.id).subscribe({
      next: () => {
        this.loadDeals();
        this.showDeleteConfirm = false;
        this.dealToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete deal:', error);
        this.showDeleteConfirm = false;
        this.dealToDelete = null!;
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
