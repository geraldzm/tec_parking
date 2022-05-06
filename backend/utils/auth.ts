import * as Base64url from 'crypto-js/enc-base64url';
import * as Utf8 from 'crypto-js/enc-utf8';
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as sha256  from 'crypto-js/sha256';

export const alg = "HS256", typ = "JWT";

function toBase64(ms: any) : string {
    return Base64url.stringify(Utf8.parse(JSON.stringify(ms)));
}

export function fromBase64(ms: string) : any {
    return JSON.parse(Utf8.stringify(Base64url.parse(ms)));
}

function encryptToken(tokenH: any, tokenB: any): string {

    const token64 = toBase64(tokenH) + '.' + toBase64(tokenB);

    // signature
    const tokenSign = createSignature(token64);
    const token = token64 + '.' + tokenSign;
    return token;
}

export function createSignature(message:string) : string {
    return Base64url.stringify(hmacSHA256(message, process.env.PRIVATE_KEY || "private key" ));
}

export function createToken(body:any) : string {

    // header
    const header = { alg: alg, typ: typ};

    // payload
    const expirationTime = new Date();
    expirationTime.setMinutes(new Date().getMinutes() + Number( process.env.TOKEN_EXPIRATION_TIME  || 60 ) );

    const payload = { exp: expirationTime, ...body };

    return encryptToken(header, payload);
}

export function toSha256(password:string) : string {
    return Base64url.stringify(sha256(password));
}
