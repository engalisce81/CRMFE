import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeadDto, LeadService } from '@proxy/leads';

@Component({
  selector: 'app-list-lead',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-lead.component.html',
  styleUrl: './list-lead.component.scss'
})
export class ListLeadComponent implements OnInit {
  leads: LeadDto[] = [];
  loading = false;
  search = '';

  totalCount = 0;
  pageSize = 10;
  pageIndex = 1;

  showDeleteConfirm = false;
  leadToDelete!: LeadDto;

  constructor(
    private leadService: LeadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.loading = true;
    this.leadService.getList(this.pageIndex, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.leads = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadLeads();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadLeads();
  }

  confirmDelete(lead: LeadDto): void {
    this.leadToDelete = lead;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.leadToDelete = null!;
  }

  deleteLead(): void {
    if (!this.leadToDelete) return;

    this.leadService.delete(this.leadToDelete.id).subscribe({
      next: () => {
        this.loadLeads();
        this.showDeleteConfirm = false;
        this.leadToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete lead:', error);
        this.showDeleteConfirm = false;
        this.leadToDelete = null!;
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

  getSourceClass(source: string | undefined): string {
    switch (source?.toLowerCase()) {
      case 'website': return 'source-website';
      case 'referral': return 'source-referral';
      case 'social media': return 'source-social';
      case 'walk-in': return 'source-walkin';
      case 'phone call': return 'source-phone';
      case 'email': return 'source-email';
      default: return 'source-default';
    }
  }

  getSourceIcon(source: string | undefined): string {
    switch (source?.toLowerCase()) {
      case 'website': return 'fa-globe';
      case 'referral': return 'fa-user-friends';
      case 'social media': return 'fa-share-alt';
      case 'walk-in': return 'fa-walking';
      case 'phone call': return 'fa-phone';
      case 'email': return 'fa-envelope';
      default: return 'fa-question-circle';
    }
  }

  // Helper function for template
  Math = Math;
}