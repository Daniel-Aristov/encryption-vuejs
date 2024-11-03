export type PublicKey = number;
export type PrivateKey = number;
export type SharedSecretKey = number;

export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function getRandomPrime(min: number, max: number): number {
  const primes: number[] = [];
  for (let i = min; i <= max; i++) {
    if (isPrime(i)) primes.push(i);
  }
  if (primes.length === 0) {
    throw new Error("Простое число не было найдено в данном диапазоне!");
  }
  return primes[Math.floor(Math.random() * primes.length)];
}

export function getUniqueRandomPrime(min: number, max: number, existingValues: number[]): number {
  let prime: number;
  do {
    prime = getRandomPrime(min, max);
  } while (existingValues.includes(prime));
  return prime;
}

export function modExp(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

export function generatePublicKey(w: number, x: PrivateKey, n: number): PublicKey {
  return modExp(w, x, n);
}

export function computeSharedSecret(y: PublicKey, x: PrivateKey, n: number): SharedSecretKey {
  return modExp(y, x, n);
}
