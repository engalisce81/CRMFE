import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateFinishDto {
  name?: string;
}

export interface FinishDto extends EntityDto<string> {
  name?: string;
}
