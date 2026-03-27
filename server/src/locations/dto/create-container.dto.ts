import { IsInt, Min } from 'class-validator';

export class CreateContainerDto {
  @IsInt()
  @Min(1)
  volumeLiters: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
