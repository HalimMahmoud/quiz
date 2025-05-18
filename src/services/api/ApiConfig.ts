export const baseURL = "https://upskilling-egypt.com:3005/api/";

export const QUESTIONS_URLS = {
  GET_ALL_QUESTIONS: `question`,
  CREATE: `question`,
  UPDATE: (id: string) => `question/${id}`,
  DELETE: (id: string) => `question/${id}`,
};

export const USER_URLS = {
    LOGIN: `auth/login`,
    REGISTER: `auth/register`,
    FORGET_PASS: `auth/forgot-password`,
    RESET_PASS: `auth/reset-password`,
    CHANGE_PASS: `auth/change-password`,
};

export const GROUP_CRUD = {
    CREATE: `group`,
    GET: `group`,
    UPDATE: (id: string | number) => `group/${id}`,
    DELETE: (id: string | number) => `group/${id}`,
};

export const STUDENT_URLS = {
  GET_STUDENTS: `/student`,
  GET_STUDENT_WITHOUT_GROUP: `/student/without-group`,
  GET_STUDENT_BY_ID: (id: string) => `/student/${id}`,
  ADD_STUDENT: `student`,
  ADD_STUDENT_TO_GROUP: (idGroup: string, studentId: string) =>
    `student/${idGroup}/${studentId}`,
  UPDATE_STUDENT: `student`,
  UPDATE_STUDENT_TO_GROUP: (idGroup: string, studentId: string) =>
    `student/${idGroup}/${studentId}`,
  DELETE_STUDENT: (id: string) => `student/${id}`,
  DELETE_STUDENT_FROM_GROUP: (idGroup: string, studentId: string) =>
    `student/${idGroup}/${studentId}`,
};