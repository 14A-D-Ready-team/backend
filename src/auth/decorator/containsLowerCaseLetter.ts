import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function ContainsLowercaseLetter() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "containsLowercaseLetter",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Must include a lowercase letter!",
      },
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const letters = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "à",
            "á",
            "â",
            "ã",
            "ä",
            "å",
            "æ",
            "ç",
            "è",
            "é",
            "ê",
            "ë",
            "ì",
            "í",
            "î",
            "ï",
            "ð",
            "ñ",
            "ò",
            "ó",
            "ô",
            "õ",
            "ö",
            "ø",
            "ù",
            "ú",
            "û",
            "ü",
            "ý",
            "þ",
            "ÿ",
            "ő",
            "ű",
          ];

          var valid = false;

          const pwdChars = Array.from(value);
          pwdChars.forEach((char: string) => {
            if (letters.includes(char)) {
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
