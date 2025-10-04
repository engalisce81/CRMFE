import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectDto, ProjectService } from '@proxy/projects';

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.scss'
})
export class ListProjectComponent implements OnInit {
  projects: ProjectDto[] = [];
  loading = false;
  search = '';

  totalCount = 0;
  pageSize = 10;
  pageIndex = 1;

  showDeleteConfirm = false;
  projectToDelete!: ProjectDto;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getList(this.pageIndex, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.projects = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onSearchChange(): void {
    this.pageIndex = 1;
    this.loadProjects();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.loadProjects();
  }

  confirmDelete(project: ProjectDto): void {
    this.projectToDelete = project;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.projectToDelete = null!;
  }

  deleteProject(): void {
    if (!this.projectToDelete) return;

    this.projectService.delete(this.projectToDelete.id).subscribe({
      next: () => {
        this.loadProjects();
        this.showDeleteConfirm = false;
        this.projectToDelete = null!;
      },
      error: (error) => {
        console.error('Failed to delete project:', error);
        this.showDeleteConfirm = false;
        this.projectToDelete = null!;
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