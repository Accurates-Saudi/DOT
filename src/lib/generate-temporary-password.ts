const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnopqrstuvwxyz";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%&*-_";
const ALL = UPPER + LOWER + DIGITS + SYMBOLS;

export function generateTemporaryPassword(length = 16): string {
  const bytes = new Uint8Array(length + 8);
  crypto.getRandomValues(bytes);

  const required = [
    UPPER[bytes[0] % UPPER.length],
    LOWER[bytes[1] % LOWER.length],
    DIGITS[bytes[2] % DIGITS.length],
    SYMBOLS[bytes[3] % SYMBOLS.length],
  ];

  const remaining = Array.from({ length: length - required.length }, (_, index) => {
    return ALL[bytes[index + 4] % ALL.length];
  });

  const combined = [...required, ...remaining];

  for (let index = combined.length - 1; index > 0; index -= 1) {
    const swapIndex = bytes[index + 8] % (index + 1);
    [combined[index], combined[swapIndex]] = [combined[swapIndex], combined[index]];
  }

  return combined.join("");
}
