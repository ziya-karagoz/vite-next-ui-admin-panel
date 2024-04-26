import { FormikErrors } from "formik";

export function tryParseInt(value: any) {
  var parsedValue = parseInt(value);
  return isNaN(parsedValue) ? value : parsedValue;
}

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCurrencySymbol(currencyCode: string): string {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
  });
  const parts = formatter.formatToParts(0);
  const currencyPart = parts.find((part) => part.type === "currency");
  if (!currencyPart) {
    throw new Error(`Currency symbol not found for ${currencyCode}`);
  }
  return currencyPart.value;
}

export function urlTextify(text : string) {
  return text
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}


// Textifier: Formats a number as a price string for the Turkish locale
export function priceTextifier(number: number) {
  return number.toLocaleString('tr-TR', { style: 'decimal', minimumFractionDigits: 2 });
}

// Detextifier: Converts a formatted price string back to a number
export function priceDetextifier(priceString: string) {
  if (priceString === "") {
      return 0;
  }
  return parseFloat(priceString.replace(/\./g, '').replace(/,/g, '.'));
}

// Utility function to flatten errors
export const listFormikErrors = (errors: FormikErrors<any>) => {
  const flattenErrors: string[] = [];
  
  const findErrors = (errorObject: FormikErrors<any>) => {
    Object.values(errorObject).forEach(error => {
      if (typeof error === 'string') {
        flattenErrors.push(error);
      } else if (typeof error === 'object') {
        findErrors(error as any);
      }
    });
  };

  findErrors(errors);
  return flattenErrors;
};