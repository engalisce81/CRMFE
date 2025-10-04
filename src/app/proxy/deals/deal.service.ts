import type { CreateUpdateDealDto, DealDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  apiName = 'Default';
  

  create = (input: CreateUpdateDealDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<DealDto>>({
      method: 'POST',
      url: '/api/app/deal',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/deal/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<DealDto>>({
      method: 'GET',
      url: `/api/app/deal/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DealDto>>({
      method: 'GET',
      url: '/api/app/deal',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateDealDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<DealDto>>({
      method: 'PUT',
      url: `/api/app/deal/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
