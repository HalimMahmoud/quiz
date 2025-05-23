export interface TestResponseObject {
  data: {
    data: {
      _id: string;
      code: string;
      title: string;
      description: string;
      status: "open" | "closed" | string;
      instructor: string;
      group: string;
      questions_number: number;
      questions: {
        _id: string;
        title: string;
        options: {
          A: string;
          B: string;
          C: string;
          D: string;
          _id: string;
        };
      }[];
      schadule: string;
      duration: number;
      score_per_question: number;
      type: string;
      difficulty: "easy" | "medium" | "hard" | string;
      updatedAt: string;
      createdAt: string;
      __v: number;
    };
  };
  isLoading: boolean;
}
