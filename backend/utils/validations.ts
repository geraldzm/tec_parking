

export function validateEmail(email: string): any {

    //Verify emails structures
    if (!email.includes('@'))
        return { ok: false, error: "Malformed email structure"}

    //Verify institutional email
    if (email.split("@")[1] !== "itcr.ac.cr" && email.split("@")[1] !== "tec.ac.cr") 
        return { ok: false, error: "Need an institutional email for the main email"}

    return {ok: true, error: ''};
}