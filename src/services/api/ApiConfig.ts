

export const baseURL = "https://upskilling-egypt.com:3005/";

export const USER_URLS = {
    LOGIN: `api/auth/login`,
    REGISTER: `api/auth/register`,
    FORGET_PASS: `api/auth/forgot-password`,
    RESET_PASS: `api/auth/reset-password`,
    CHANGE_PASS: `api/auth/change-password`,
};

export const GROUP_CRUD = {
    CREATE: `api/group`,
    GET: `api/group`,
    UPDATE: (id: string | number) => `api/group/${id}`,
    DELETE: (id: string | number) => `api/group/${id}`,
};