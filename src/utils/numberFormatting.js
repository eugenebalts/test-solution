export function isCorrectCountry(value) {
  return value.startsWith('+7');
}

export function isCorrectSymbol(value) {
  const allowedSymbols = [
    '+',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  const lastSymbol = value[value.length - 1];

  if (value.length > 1 && lastSymbol === '+') {
    return false;
  }

  return !!allowedSymbols.includes(lastSymbol);
}

export function isCorrectNumberLength(value) {
  return value.length === 10;
}

export function formatPhoneNumber(number) {
  let formattedValue = `+7`;

  if (number.length >= 1) {
    formattedValue += `(${number.slice(0, 3)}`;
  }
  if (number.length >= 4) {
    formattedValue += `)${number.slice(3, 6)}`;
  }
  if (number.length >= 7) {
    formattedValue += `-${number.slice(6, 8)}`;
  }
  if (number.length >= 9) {
    formattedValue += `-${number.slice(8)}`;
  }

  return formattedValue;
}
