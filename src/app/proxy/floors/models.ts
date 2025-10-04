import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateFloorDto {
  name?: string;
  key: number;
}

export interface FloorDto extends EntityDto<string> {
  name?: string;
  key: number;
}
