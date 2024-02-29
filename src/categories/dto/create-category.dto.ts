import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
 