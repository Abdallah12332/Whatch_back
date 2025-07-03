import { SetMetadata } from '@nestjs/common';

export const ROLE_key = 'roles';

export const Roles = (...role: string[]) => SetMetadata(ROLE_key, role);
