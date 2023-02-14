import { UserType } from "@/user";
import { Expose } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ContainsSpecialChar } from "../../shared/validation/decorator/contains-special-char.decorator";
import { ContainsNumber } from "../../shared/validation/decorator/contains-number.decorator";
import { ContainsCapitalLetter } from "../../shared/validation/decorator/contains-capital-letter.decorator";
import { ContainsLowercaseLetter } from "../../shared/validation/decorator/contains-lowercase-letter.decorator";
import { IsValidName } from "../decorator/is-valid-name.decorator";
import { ApiProperty } from "@nestjs/swagger";

// NONO karakter: "
const allowedForName =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ]*$/;
const allowedForPassword =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ<>#&@{};,.:_?!~'+%-=()€$ˇ^˘°˛`˙´´˝¨¸\-\[\]]*$/;

export class RegistrationDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(allowedForName)
  @IsValidName()
  public name!: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(80)
  public email!: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(allowedForPassword)
  @ContainsSpecialChar()
  @ContainsNumber()
  @ContainsCapitalLetter()
  @ContainsLowercaseLetter()
  public password!: string;

  @Expose()
  @ApiProperty()
  @IsEnum(UserType)
  public type!: UserType;
}
