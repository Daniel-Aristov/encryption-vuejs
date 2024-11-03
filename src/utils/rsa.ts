export function generateRSAKeys() {
	const { p, q } = generateDistinctPrimesInRange(100, 1000);
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  const e = getE(phi);
  const d = modInverse(e, phi);

	console.log(p, q, n, phi, e, d);

  return {
    publicKey: { e, n },
    privateKey: { d, n }
  };
}

export function rsaEncrypt(text: string, publicKey: { e: number, n: number }): string {
  const { e, n } = publicKey;
  return text
    .split('')
    .map(char => {
      const m = char.charCodeAt(0);
      const c = modExp(m, e, n);
      return c.toString();
    })
    .join(' ');
}

export function rsaDecrypt(cipherText: string, privateKey: { d: number, n: number }): string {
  const { d, n } = privateKey;
  return cipherText
    .split(' ')
    .map(part => {
      const c = parseInt(part, 10);
      const m = modExp(c, d, n);
      return String.fromCharCode(m);
    })
    .join('');
}

function getRandomPrimeInRange(min: number, max: number): number {
  let prime = min + Math.floor(Math.random() * (max - min));
  while (!isPrime(prime) && prime <= max) {
    prime++;
  }

  if (prime > max) {
    return getRandomPrimeInRange(min, max);
  }
  return prime;
}

function generateDistinctPrimesInRange(min: number, max: number): { p: number, q: number } {
  const p = getRandomPrimeInRange(min, max);
  let q = getRandomPrimeInRange(min, max);

  while (q === p) {
    q = getRandomPrimeInRange(min, max);
  }

  return { p, q };
}

function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function getE(phi: number): number {
  let e = 2;
  while (e < phi && gcd(e, phi) !== 1) {
    e++;
  }
  return e;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a: number, m: number): number {
  const { x } = extendedGCD(a, m);
  return (x % m + m) % m;
}

interface EGCDResult {
  x: number;
  y: number;
  gcd: number;
}

function extendedGCD(a: number, b: number): EGCDResult {
  if (b === 0) return { x: 1, y: 0, gcd: a };
  const { x: x1, y: y1, gcd } = extendedGCD(b, a % b);
  return { x: y1, y: x1 - Math.floor(a / b) * y1, gcd };
}

function modExp(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}
