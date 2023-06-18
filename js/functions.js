// Функция для проверки длины строки. Она нам пригодится для валидации формы. Примеры использования функции:

const stringLenghtCheck = (inputString, maxLength) => inputString.length <= maxLength;

stringLenghtCheck('function is working', 20); // Вернет true
stringLenghtCheck('function is working', 10); // Вернет false


// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:

const palindromeCheck = (inputString) => {

  const optimizedString = inputString.toLowerCase().replaceAll(' ', '');

  return optimizedString.split('').reverse().join('') === optimizedString;
};

palindromeCheck('топот'); // Вернет true
palindromeCheck('Лёша на полке клопа нашёл '); // Вернет true
palindromeCheck('Лёша на полке клопа нашёк '); // Вернет false

// Доп. задание. Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:


const extractingNumbers = (inputString) => {

  let extractedNumber = '';

  if (inputString === Number.isInteger(inputString)) {
    return Math.abs(inputString);
  }

  for (let i = 0; i <= inputString.length; i++) {

    if (!isNaN(Number(inputString[i]))) {
      extractedNumber += inputString[i];
    }
  }

  if (Number(extractedNumber)) {
    return extractedNumber;
  }
  return NaN;
};

extractingNumbers('ECMAScript 2022'); // Функция вернет 2022
extractingNumbers('1 кефир, 0.5 батона'); // Функция вернет 105


