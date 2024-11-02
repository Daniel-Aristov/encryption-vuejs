export const russianAlphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

export function caesarCipher(text: string, shift: number): string {
  const alphabet = russianAlphabet;
  const alphabetSize = alphabet.length;
  const lowerAlphabet = alphabet.toLowerCase();
  shift = (shift % alphabetSize + alphabetSize) % alphabetSize;

  return text
    .split('')
    .map((char) => {
      const isLower = char === char.toLowerCase();
      const currentAlphabet = isLower ? lowerAlphabet : alphabet;
      const index = currentAlphabet.indexOf(char);

      if (index === -1) return char;

      const newIndex = (index + shift) % alphabetSize;
      return currentAlphabet[newIndex];
    })
    .join('');
}
