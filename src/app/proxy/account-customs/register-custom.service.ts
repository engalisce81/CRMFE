import type { RegisterCustomDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupAccountDto, LookupDto } from '../lookups/models';
import type { ResponseApi } from '../response/models';

@Injectable({
  providedIn: 'root',
})
export class RegisterCustomService {
  apiName = 'Default';
  

  getAccountTypes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupAccountDto>>({
      method: 'GET',
      url: '/api/app/register-custom/account-types',
    },
    { apiName: this.apiName,...config });
  

  register = (input: RegisterCustomDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseApi<LookupDto>>({
      method: 'POST',
      url: '/api/app/register-custom/register',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
