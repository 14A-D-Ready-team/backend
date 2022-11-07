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
import { ContainsSpecialChar } from "../decorator/containsSpecialChar";
import { ContainsNumber } from "../decorator/containsNumber";
import { ContainsCapitalLetter } from "../decorator/containsCapitalLetter";
import { ContainsLowercaseLetter } from "../decorator/containsLowerCaseLetter";
import { IsValidName } from "../decorator/isValidName";

// NONO karakter: "
const allowedForName =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ]*$/;
const allowedForPassword =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ<>#&@{};,.:_?!~'+%/-=()€$ˇ^˘°˛`˙´´˝¨¸\-\[\]]*$/;

export class RegistrationDto {
  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(allowedForName)
  @IsValidName()
  public name!: string;

  @Expose()
  @IsString()
  @IsEmail()
  public email!: string;

  @Expose()
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
  @IsEnum(UserType)
  public type!: UserType;
}
