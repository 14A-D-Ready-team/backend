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
  public password!: string;

  @Expose()
  @IsEnum(UserType)
  public type!: UserType;
}
