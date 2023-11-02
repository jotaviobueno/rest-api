import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IdInput {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
