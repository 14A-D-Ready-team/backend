import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsValidPassword() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidPassword",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Must include special character",
      },
      validator: {
        validate(value: string, args: ValidationArguments): boolean { //return not boolean?
          
          const specialChars = ['<', '>', '#', '&', '@', '{', '}', ';', ',', '.', ':', '_', '?', '!', '~', '\'', '+', '%', '/', '-', '=', '(', ')', '€', '$', 'ˇ', '^', '˘', '°', '˛', '`', '˙', '´', '´', '˝', '¨', '¸', '-', '[', ']'];

          const pwdChars = Array.from(value);
          pwdChars.forEach((char: string) => {
            if (specialChars.includes(char)) {
              return true;
            } else {
              return false;
            }
          });
          return true;
        },
      },
    });
  };
}
