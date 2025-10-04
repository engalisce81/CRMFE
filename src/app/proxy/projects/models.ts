import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateProjectDto {
  name?: string;
  description?: string;
  location?: string;
}

export interface ProjectDto extends EntityDto<string> {
  name?: string;
  description?: string;
  location?: string;
}
