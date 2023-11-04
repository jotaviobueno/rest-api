import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PersonRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  personId: string;

  @IsMongoId()
  @IsNotEmpty()
  roleId: string;
}
