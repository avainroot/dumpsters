import {
  IsString,
  IsNumber,
  IsInt,
  IsArray,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContainerDto } from './create-container.dto';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng?: number;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  buildingIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => CreateContainerDto)
  containers?: CreateContainerDto[];
}
