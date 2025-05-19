export const baseURL = "https://upskilling-egypt.com:3005/api/";

export const USER_URLS = {

  LOGIN: `auth/login`,
  REGISTER: `auth/register`,
  FORGET_PASS: `auth/forgot-password`,
  RESET_PASS: `auth/reset-password`,
  CHANGE_PASS: `auth/change-password`,
};

export const QUESTIONS_URLS = {
  GET_ALL_QUESTIONS: `question`,
  CREATE: `question`,
  UPDATE: (id: string) => `question/${id}`,
  DELETE: (id: string) => `question/${id}`,
};

export const GROUP_CRUD = {
    CREATE: `api/group`,
    GET: `api/group`,
    UPDATE: (id: string | number) => `api/group/${id}`,
    DELETE: (id: string | number) => `api/group/${id}`,
  };
  export const RESULT_ULR={
    GET_All:"quiz/result",
    GET_GROUP_BY_ID: (id: string | number) => `group/${id}`,
  };
