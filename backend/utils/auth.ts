import * as Base64 from 'crypto-js/enc-base64';
import * as hmacSHA256 from 'crypto-js/hmac-sha256';

export function encrypt(message:string): string {
    return Base64.stringify(hmacSHA256(message, process.env.PRIVATE_KEY || "private key" ));
}