import {
  registerDecorator,
} from "class-validator";

export function ContainsNumber() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "containsNumber",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Must include a number!",
      },
      validator: {
        validate(value: string): boolean {
          const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

          var valid = false;

          const pwdChars = Array.from(value);
          pwdChars.forEach((char: string) => {
            if (numbers.includes(char)) {
              valid = true;
            }
          });

          if (valid) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
