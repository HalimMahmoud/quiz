export interface Quiz {
    _id: string;
    questions_number: number;
    duration: number;
    score_per_question: number;
    schadule: string;
    type: string;
    title: string;
    description: string;
    group: string;
    difficulty: string;
}
export type CodeDialogProps ={
    isSuccessDialogOpen: boolean;
    setIsSuccessDialogOpen:React.Dispatch<React.SetStateAction<boolean>>;
    quizCode:string;
    handleCreateNewQuiz:() => void;
}