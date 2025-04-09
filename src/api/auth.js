import { ENV } from "../utils";
const { BASE_API, API_ROUTES } = ENV;

export class Auth{
    async signIn(data){
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.SINGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }); 
        return response;
    }

    async verifyCodePhone(email, phoneCode){
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.VERIFY_CODE_PHONE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, phoneCode })
        });
        return response;
    }

    async resendCodePhone(email){
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.RESEND_CODE_PHONE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        return response;
    }

    async departmentList(){
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.DEPARTMENT_LIST}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }   

}

export const auth = new Auth();