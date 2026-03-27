// src/locations/dto/create-location.dto.ts
import { IsString, IsNumber, IsInt, IsArray, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContainerDto } from './create-container.dto';

export class CreateLocationDto {
  @IsString()
  address: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @IsInt()
  companyId: number;

  @IsArray()
  @IsInt({ each: true })
  buildingIds: number[];

  @IsArray()
  @Type(() => CreateContainerDto)
  containers: CreateContainerDto[];
}
