export function caesarCipher(text: string, shift: number): string {
  const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
  const alphabetSize = alphabet.length
  shift = (shift % alphabetSize + alphabetSize) % alphabetSize

  return text
    .split('')
    .map((char) => {
      const isLower = char === char.toLowerCase();
      const currentAlphabet = isLower ? alphabet.toLowerCase() : alphabet;
      const index = currentAlphabet.indexOf(char);

      if (index === -1) return char;

      const newIndex = (index + shift) % alphabetSize;
      return currentAlphabet[newIndex];
    })
    .join('');
}
