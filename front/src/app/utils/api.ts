import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

var token: string;

// local storage
function getToken():string {
    const token = window.localStorage.getItem("authToken");
    if(!token) return '';
  
    return token;
}
  
export async function removeAuthToken() {
    window.localStorage.setItem("authToken", '');
}
  
export async function saveToken(authToken:string) {
    window.localStorage.setItem("authToken", authToken);
    token = authToken;
}

export class CallAPI  {

    constructor(private router: Router) { }
    

    public async callAPI({
        url = '',
        method = 'GET',
        headers = {},
        body = {},
        withAuth = true
    }):Promise<any> {

        try {

            // if requires auth, then find token
            if(withAuth) {

                if(!token || token === '') token = getToken();
                if(token === '') {
                    this.router.navigate(['/login']);
                    throw new Error("Error getting token on local storaged"); 
                }

                // add bare token to headers
                headers = {...headers, 'Authorization': `Bearer ${token}`};
            }

            // call API
            let options:any =  {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
            };

            if(method !== 'GET') options.body = JSON.stringify(body);

            const response = await fetch( `${environment.apiURL}/` + url, options);
            
            if(response.status === 401) {
                // UNAUTHORIZED
                removeAuthToken();
                this.router.navigate(['/login']);
                throw new Error("Invalid token"); 
            }

            return {response: response.bodyUsed ? await response.json(): null, status: response.status};
        } catch (e) {
            console.log(e);
            return {response: null, status: 401};
        }

    }
}
