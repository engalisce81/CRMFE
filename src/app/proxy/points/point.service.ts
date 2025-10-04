import type { CreateUpdatePointDto, PointDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  apiName = 'Default';
  

  create = (input: CreateUpdatePointDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<PointDto>>({
      method: 'POST',
      url: '/api/app/point',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/point/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<PointDto>>({
      method: 'GET',
      url: `/api/app/point/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PointDto>>({
      method: 'GET',
      url: '/api/app/point',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdatePointDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<PointDto>>({
      method: 'PUT',
      url: `/api/app/point/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
