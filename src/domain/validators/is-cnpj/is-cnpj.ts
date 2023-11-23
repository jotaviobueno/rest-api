import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCnpj', async: false })
export class IsValueIsCnpjValid implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _: ValidationArguments) {
    if (typeof value !== 'string' || value.length != 14) return false;

    const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;

    if (!value) return false;

    const isString = typeof value === 'string';
    const validTypes =
      isString || Number.isInteger(value) || Array.isArray(value);

    if (!validTypes) return false;

    if (isString) {
      const digitsOnly = /^\d{14}$/.test(value);
      const validFormat = regexCNPJ.test(value);
      const isValid = digitsOnly || validFormat;

      if (!isValid) return false;
    }

    const numbers = matchNumbers(value);

    if (numbers.length !== 14) return false;

    const items = [...new Set(numbers)];
    if (items.length === 1) return false;

    const digits = numbers.slice(12);

    const digit0 = validCalc(12, numbers);
    if (digit0 !== digits[0]) return false;

    const digit1 = validCalc(13, numbers);
    return digit1 === digits[1];

    function validCalc(x: number, numbers: number[]) {
      const slice = numbers.slice(0, x);
      let factor = x - 7;
      let sum = 0;

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i];
        sum += n * factor--;
        if (factor < 2) factor = 9;
      }

      const result = 11 - (sum % 11);

      return result > 9 ? 0 : result;
    }

    function matchNumbers(value: string | number | number[] = '') {
      const match = value.toString().match(/\d/g);

      return Array.isArray(match) ? match.map(Number) : [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'This cnpj its invalid.';
  }
}

export function IsCnpj() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueIsCnpjValid,
    });
  };
}
