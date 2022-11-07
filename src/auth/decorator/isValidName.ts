import {
  registerDecorator,
} from "class-validator";

export function IsValidName() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "nameNotValid",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message:
          "Must not include more than 3 spaces, spaces cannot be next to each other, name cannot start with space!",
      },
      validator: {
        validate(value: string): boolean {
          var spaces = 0;

          const nameChars = Array.from(value);
          nameChars.forEach((char: string) => {
            if (char === " ") {
              spaces++;
            }
          });

          if (nameChars[0] === " ") {
            return false;
          }

          if (value.includes("  ") || value.includes("   ")) {
            return false;
          }

          if (spaces > 3) {
            return false;
          } else {
            return true;
          }
        },
      },
    });
  };
}
