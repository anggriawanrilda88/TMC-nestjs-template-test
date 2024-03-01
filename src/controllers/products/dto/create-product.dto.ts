import { IsNotEmpty, IsString, MaxLength, Min } from "class-validator";
import { IsUnique } from "../../../shared/is.unique";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'products', column: 'sku' })
  sku: string;

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Min(0)
  price: number;
}
