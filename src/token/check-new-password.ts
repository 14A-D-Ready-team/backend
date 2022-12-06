import { InvalidPasswordException } from "../auth/exceptions/invalid-password-exception";

export class CheckNewPassword {
  public async CheckPwd(password: string) {
    const capitalLetters = [
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

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

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

    if (password === undefined) {
      throw new InvalidPasswordException();
    }

    if (password.length < 8) {
      throw new InvalidPasswordException();
    }

    let hasCapital = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecial = false;

    const chars = Array.from(password);

    chars.forEach((char: string) => {
      if (capitalLetters.includes(char)) {
        hasCapital = true;
      }
    });

    chars.forEach((char: string) => {
      if (letters.includes(char)) {
        hasLowercase = true;
      }
    });

    chars.forEach((char: string) => {
      if (numbers.includes(char)) {
        hasNumber = true;
      }
    });

    chars.forEach((char: string) => {
      if (specialChars.includes(char)) {
        hasSpecial = true;
      }
    });

    if (hasCapital && hasLowercase && hasNumber && hasSpecial) {
      return true;
    } else {
      throw new InvalidPasswordException();
    }
  }
}
