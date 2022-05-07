import { NextFunction } from "express";
import { status } from "../utils/http";


export function middlewareValidateScopes  (req: any, rs: any, next: NextFunction) {

    try {

        if(!req.scopes || !req.scopesRequired)
            throw new Error("no scopes provided");

        console.log(req.scopesRequired);
        console.log(req.scopes);

        req.scopesRequired.forEach( (s:string) => {
            if(req.scopes.indexOf(s) < 0 )
                throw new Error(`no scope ${s} found`);
        });

        next();
    } catch (error: any) {
        console.log(error.message);
        rs.sendStatus(status.UNAUTHORIZED);
        return;
    }

}

export const reportsScopes = (req: any, rs: any, next: NextFunction) => {
    req.scopesRequired = ["reports"];
    next();
};
