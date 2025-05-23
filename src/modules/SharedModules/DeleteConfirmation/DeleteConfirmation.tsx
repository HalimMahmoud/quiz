import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useDeleteQuestionMutation } from "@/store/questions/QuestionApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteQuizMutation } from "@/store/quizes/QuizesApi";
import { toast } from "sonner";
import Loading from "../Loading/Loading";

export default function DeleteConfirmation({
  questionId,
  children,
}: {
  questionId: string;
  children?: ReactNode;
}) {
  const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();
      const [deleteQuiz,{isLoading:isQuizLoading}] = useDeleteQuizMutation();
      const {pathname} = useLocation();
      const isQuizPage = pathname.includes('quizes');
      const navigate = useNavigate();
  const onDelete = async () => {
    try {
      if (isQuizPage) {
        await deleteQuiz(questionId);
      } else {
        await deleteQuestion(questionId);
      }
      setOpen(false);
      toast.success("item deleted successfully");
      if (isQuizPage) navigate("/dashboard/quizes");
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden [&>button]:hidden">
        <div className="border-b relative h-[50px]">
          <DialogTitle className="text-base font-medium p-4 float-left">
            Delete {isQuizPage?"Quiz":"Question"}
          </DialogTitle>
          <div className="h-full flex float-right">
            <Button
              variant="ghost"
              className="h-full rounded-none px-4 text-green-600 hover:bg-green-50 hover:text-green-700 border-l"
              onClick={onDelete}
              disabled={isLoading}
            >
              {(isLoading || isQuizLoading)?<Loading/>:<Check className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="h-full rounded-none px-4 text-red-600 hover:bg-red-50 hover:text-red-700 border-l"
              disabled={isQuizPage? isQuizLoading: isLoading}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4 text-base font-medium  text-center">
          Are you want to delete this Item ?
        </div>
      </DialogContent>
    </Dialog>
  );
}
