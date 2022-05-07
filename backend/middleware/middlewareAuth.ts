import { NextFunction } from "express";
import { status } from "../utils/http";
import { createSignature, fromBase64, alg, typ } from "../utils/auth";

function isValid(m: string ) : boolean {
    return m !== undefined && m !== null && typeof m === "string" && m !== "";
}

export const tokenMiddlewareValidation = async (req: any, rs: any, next: NextFunction) => {

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        console.log("no Beare token provied");
        rs.sendStatus(status.UNAUTHORIZED);
        return;
    }

    try {
        const unauthToken = req.headers.authorization.split("Bearer ")[1];

        // decode token
        const tokenParts:string[] = unauthToken.split(".");
        if(tokenParts.length != 3 || !isValid(tokenParts[0]) || !isValid(tokenParts[1]) || !isValid(tokenParts[2])) 
            throw new Error("Malformed token");

        const headers = fromBase64(tokenParts[0]);
        if(headers.alg !== alg || headers.typ !== typ)  
            throw new Error("Invalid encryption algorithm or token type");

        const body = fromBase64(tokenParts[1]);
        if(!body.exp)  
            throw new Error("No expiration time provided");

        if(!isValid(body.sub) || !isValid(body.name) || !isValid(body.email))  
            throw new Error("No user info provided");

        // validate signature 
        const validSignature = createSignature(tokenParts[0] + '.' + tokenParts[1]);

        if(validSignature !== tokenParts[2]) {
           throw new Error("Invalid Signature");
        }

        // validate expiration time
        const exp = new Date(body.exp);
        if (exp <= new Date()) {
           throw new Error("Token expired");
        }
        

        req.userId = body.sub;
        req.userName = body.name;
        req.userEmail = body.email;
        req.scopes = body.scopes || [];

        next();
        return;
    } catch (error: any) {
        console.log(error.message);
        rs.sendStatus(status.UNAUTHORIZED);
        return;
    }
};