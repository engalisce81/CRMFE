import type { CreateUpdateDealStatusDto, DealStatusDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class DealStatusService {
  apiName = 'Default';
  

  create = (input: CreateUpdateDealStatusDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<DealStatusDto>>({
      method: 'POST',
      url: '/api/app/deal-status',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/deal-status/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<DealStatusDto>>({
      method: 'GET',
      url: `/api/app/deal-status/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDealstatusLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto>>({
      method: 'GET',
      url: '/api/app/deal-status/dealstatus-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (pageNumber: number, pageSize: number, search: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DealStatusDto>>({
      method: 'GET',
      url: '/api/app/deal-status',
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateDealStatusDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<DealStatusDto>>({
      method: 'PUT',
      url: `/api/app/deal-status/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
