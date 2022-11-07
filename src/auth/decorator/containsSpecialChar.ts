import {
  registerDecorator,
} from "class-validator";

export function ContainsSpecialChar() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "containsSpecialChar",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Must include special character!",
      },
      validator: {
        validate(value: string): boolean {
          const specialChars = [
            "<",
            ">",
            "#",
            "&",
            "@",
            "{",
            "}",
            ";",
            ",",
            ".",
            ":",
            "_",
            "?",
            "!",
            "~",
            "'",
            "+",
            "%",
            "/",
            "-",
            "=",
            "(",
            ")",
            "€",
            "$",
            "ˇ",
            "^",
            "˘",
            "°",
            "˛",
            "`",
            "˙",
            "´",
            "´",
            "˝",
            "¨",
            "¸",
            "-",
            "[",
            "]",
          ];

          var valid = false;

          const pwdChars = Array.from(value);
          pwdChars.forEach((char: string) => {
            if (specialChars.includes(char)) {
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
