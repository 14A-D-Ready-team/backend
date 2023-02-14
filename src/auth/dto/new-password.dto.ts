import { ContainsSpecialChar } from "../../shared/validation/decorator/contains-special-char.decorator";
import { ContainsNumber } from "../../shared/validation/decorator/contains-number.decorator";
import { ContainsCapitalLetter } from "../../shared/validation/decorator/contains-capital-letter.decorator";
import { ContainsLowercaseLetter } from "../../shared/validation/decorator/contains-lowercase-letter.decorator";
import { Expose } from "class-transformer";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const allowedForPassword =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ<>#&@{};,.:_?!~'+%-=()€$ˇ^˘°˛`˙´´˝¨¸\-\[\]]*$/;

export class NewPasswordDto {
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
}
