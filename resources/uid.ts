import { timestamp } from 'ndforge/timer';
import { randomBytes } from 'node:crypto';


export function uuidv7(): string {
  const ts = BigInt(timestamp());
  const timeHex = ts.toString(16).padStart(12, '0');

  const randomBytesArray = randomBytes(13);

  // UUID v7 format: time-based 48 bits + version 4 bits + random 74 bits
  const uuid = [
    // Time high and version (combine the high 12 bits of time with version 7)
    timeHex.substring(0, 8),
    timeHex.substring(8, 12), // Time low
    `7${randomBytesArray[0].toString(16).padStart(2, '0').slice(1)}${randomBytesArray.subarray(1, 3).toString('hex')}`, // Version 7
    randomBytesArray.subarray(3, 6).toString('hex'), // Random part
    randomBytesArray.subarray(6).toString('hex'), // Remaining random bytes
  ];

  return uuid.join('-').toLowerCase();
}
