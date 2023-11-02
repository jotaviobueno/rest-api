import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdatePersonDto extends PartialType(
  OmitType(CreatePersonDto, ['email']),
) {
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}
