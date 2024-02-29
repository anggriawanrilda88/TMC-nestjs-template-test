import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, ValidateIf } from "class-validator";
import { log } from "console";
import { IsUnique } from "src/shared/is.unique";

export class FindProductDto {
  page?: number = 1;
  perPage?: number = 10;
  sku: string[];
  name: string[];

  @ValidateIf(obj => obj["price.end"] !== undefined)
  @IsNotEmpty()
  @IsNumberString()
  "price.start": number;

  @ValidateIf(obj => obj["price.start"] !== undefined)
  @IsNotEmpty()
  @IsNumberString()
  "price.end": number;

  @ValidateIf(obj => obj["stock.end"] !== undefined)
  @IsNotEmpty()
  @IsNumberString()
  "stock.start": number;

  @ValidateIf(obj => obj["stock.start"] !== undefined)
  @IsNotEmpty()
  @IsNumberString()
  "stock.end": number;

  "category.id": string[];
  "category.name": string[];
}
