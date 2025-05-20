export interface Participant {
    _id: string;
    score: number;
    started_at: string;
    finished_at: string;
    participant: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
    quiz: {
      _id: string;
      title: string;
    };
  }
  
  export interface QuizResultData {
    _id: string;
    quiz: {
      _id: string;
      title: string;
      closed_at: string;
    };
    participants: Participant[];
  }
  export interface GroupData {
      name: string;
      students: Array<{ id: string; name: string }>;
  }
  
  
  export interface Quiz {
      _id: string;
      title: string;
      closed_at: string;
      group: string;
  }
  
  export interface Result {
      _id: string;
      quiz: Quiz;
      participants: Participant[];
      groupData?: GroupData;
  }