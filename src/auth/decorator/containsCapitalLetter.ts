import {
  registerDecorator,
} from "class-validator";

export function ContainsCapitalLetter() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "containsCapitalLetter",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Must include a capital letter!",
      },
      validator: {
        validate(value: string): boolean {
          const letters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "À",
            "Á",
            "Â",
            "Ã",
            "Ä",
            "Å",
            "Æ",
            "Ç",
            "È",
            "É",
            "Ê",
            "Ë",
            "Ì",
            "Í",
            "Î",
            "Ï",
            "Ð",
            "Ñ",
            "Ò",
            "Ó",
            "Ô",
            "Õ",
            "Ö",
            "Ø",
            "Ù",
            "Ú",
            "Û",
            "Ü",
            "Ý",
            "Þ",
            "ß",
            "Ő",
            "Ű",
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
