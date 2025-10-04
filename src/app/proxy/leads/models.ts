import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateLeadDto {
  name?: string;
  description?: string;
  phoneNumber?: string;
  source?: string;
}

export interface LeadDto extends AuditedEntityDto<string> {
  name?: string;
  description?: string;
  phoneNumber?: string;
  source?: string;
}
