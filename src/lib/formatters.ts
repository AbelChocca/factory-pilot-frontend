export function formatDecimal(value: string | null): string {
  if (value === null) {
    return "N/A";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return value;
  }

  return number.toFixed(2);
}
