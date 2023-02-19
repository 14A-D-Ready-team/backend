import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsArray,
  IsInstance,
  ValidateNested,
} from "class-validator";
import { OptionCount } from "../option-count.enum";
import { EditOptionDto } from "./edit-option.dto";

export class EditCustomizationDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  public description!: string;

  @Expose()
  @ApiProperty()
  @IsEnum(OptionCount)
  public optionCount!: OptionCount;

  @Expose()
  @Type(() => EditOptionDto)
  @ApiProperty()
  @IsArray()
  @IsInstance(EditOptionDto, { each: true })
  @ValidateNested()
  public options!: EditOptionDto[];
}
