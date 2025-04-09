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

    async deptos() {
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.DEPARTMENTS}`, {
          method: "GET",
        });
      
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
      
        const data = await response.json()
      
        return data;
      } 

      async uploadFile(formData){
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.UPLOAD_FILE}`, {
            method: 'POST',
            body: formData,
        });
    
        if (!response.ok) {
            throw new Error('Error al cargar el archivo');
        }
    
        const data = await response.json();
        console.log(data);
        return data;
      }

}

export const auth = new Auth();