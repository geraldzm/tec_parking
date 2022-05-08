import { environment } from '../../environments/environment';

var token: string;

// local storage
function getToken():string {
    const token = window.localStorage.getItem("authToken");
    if(!token) return '';
  
    return token;
}
  
function removeAuthToken() {
    window.localStorage.setItem("authToken", '');
}
  
export async function saveToken(authToken:string) {
    window.localStorage.setItem("authToken", authToken);
    token = authToken;
}

// 
export async function callAPI({
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
            if(token === '') throw new Error("Error getting token on local storaged"); 

            // add bare token to headers
            headers = {...headers, 'Authorization': `Bearer ${token}`};
        }

        // call API
        const options =  {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        };

        console.log( `${environment.apiURL}/` + url);

        const response = await fetch( `${environment.apiURL}/` + url, options);
        
        if(response.status === 401) // UNAUTHORIZED
            throw new Error("Invalid token");

        return {response: await response.json(), status: response.status};
    } catch (e) {
        console.error(e);
        
        removeAuthToken();
     //   window.location.replace("www.youtube.com"); // redirect to login
        return null;
    }

}