//All the API endpoints will be declared here and then this will be used in entire frontend to access the endpoints...

const BaseURL = "http://localhost:8000/api/";
// const BaseURL = import.meta.env.VITE_URL;

export const authEndpoints = {
    LOGIN_API: BaseURL + "auth/login",
    REGISTER: BaseURL + "auth/register",
    LOGOUT: BaseURL + "auth/logout",
    VALIDATE_GMAIL: BaseURL + "auth/verify-verification-code",
}

export const uploadEndPoints = {
    UPLOAD: BaseURL + "upload/",

}