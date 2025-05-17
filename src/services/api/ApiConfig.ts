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

