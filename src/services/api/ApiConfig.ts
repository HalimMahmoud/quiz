export const baseURL = 'https://upskilling-egypt.com:3005/';

export const USER_URLS = {
  LOGIN: `api/auth/login`,
  REGISTER: `api/auth/register`,
  FORGET_PASS: `http://upskilling-egypt.com:3005/api/auth/forgot-password`,
  RESET_PASS: `api/auth/reset-password`,
  CHANGE_PASS: `api/auth/change-password`,
};

export const STUDENT_URLS = {
  GET_STUDENTS: `/api/student`,
  GET_STUDENT_WITHOUT_GROUP: `/api/student/without-group`,
  GET_STUDENT_BY_ID: (id: string) => `/api/student/${id}`,
  ADD_STUDENT: `api/student`,
  ADD_STUDENT_TO_GROUP: (idGroup: string, studentId: string) =>
    `/api/student/${idGroup}/${studentId}`,
  UPDATE_STUDENT: `api/student`,
  UPDATE_STUDENT_TO_GROUP: (idGroup: string, studentId: string) =>
    `/api/student/${idGroup}/${studentId}`,
  DELETE_STUDENT: (id: string) => `api/student/${id}`,
  DELETE_STUDENT_FROM_GROUP: (idGroup: string, studentId: string) =>
    `/api/student/${idGroup}/${studentId}`,
};