import { IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  address: string;
}
