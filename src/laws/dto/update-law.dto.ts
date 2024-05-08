import { IsOptional } from 'class-validator';

export class UpdateLawDto {
  @IsOptional()
  heading: string;

  @IsOptional()
  mainText: string;

  @IsOptional()
  releaseDate: Date;
}
