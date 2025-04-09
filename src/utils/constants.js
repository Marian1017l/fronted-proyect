const SERVER_IP = import.meta.env.VITE_DEV_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

export const ENV={
    BASE_PATH: SERVER_IP,
    BASE_API : `${SERVER_IP}/${API_VERSION}`,
    API_ROUTES:{
        SINGIN: '/auth/signin',
        VERIFY_CODE_PHONE: '/auth/2fa',
        RESEND_CODE_PHONE: '/auth/2fa/resend',
    }
}