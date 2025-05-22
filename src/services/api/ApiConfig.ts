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
export const RESULT_ULR = {
  GET_All: "quiz/result",
  GET_GROUP_BY_ID: (id: string | number) => `group/${id}`,
};

export const STUDENTSQUIZZES_URL = {
  joinQuiz: "quiz/join",
  qutionWithoutAnswer: (id: string) => `quiz/without-answers/${id}`,
  submitQuiz: (id: string) => `quiz/submit/${id}`,
  firstFiveIncomming: `quiz/incomming`,
  lastFiveCompleted: `quiz/completed`,
  result: `quiz/result`,
};

export const STUDENT_QUIZ = {
  INCOMING: "quiz/incomming",
  COMPLETED: "quiz/completed",
  GET_RESULTS: "quiz/result",
  JOIN: "quiz/join",
};

export const QUIZES_URLS = {
  INCOMING_QUIZES: "/quiz/incomming",
  COMPLETED_QUIZES: "/quiz/completed",
  CREATE_QUIZ: "/quiz",
  UPDATE_QUIZ: (id: string) => `/quiz/${id}`,
  delete_QUIZ: (id: string) => `/quiz/${id}`,
}