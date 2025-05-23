import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CodeDialog from "./CodeDialog";
import SubmitButton from "@/components/form/SubmitButton";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import type { ErrorResponse } from "@/interfaces/errors.interfaces";
import { useJoinQuizMutation } from "@/store/studentsquizzes/StudentQuizzesApi";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store/DefaultStore";
import { useSelector } from "react-redux";

const QuizSchema = z.object({
  code: z.string().min(1, "Code is required"),
});

type QuizFormData = z.infer<typeof QuizSchema>;

export function QuizJoin({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [joinQuiz] = useJoinQuizMutation();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [quizCode, setQuizCode] = useState("");

  const form = useForm<QuizFormData>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<QuizFormData> = async (values) => {
    try {
      const response = await joinQuiz(values).unwrap();
      console.log(response);
      console.log(`/dashboard/test/${response.data.quiz}`);
      navigate(`/dashboard/test/${response.data.quiz}`);

      setIsCreateDialogOpen(false);
      setQuizCode(response?.data?.code || "");
      setIsSuccessDialogOpen(true);
      toast.success(response?.data?.message || "Quiz joined successfully");

      form.reset();
    } catch (error) {
      toast.error(
        (error as ErrorResponse)?.data?.message || "Error in creating quiz"
      );
    }
  };

  const handleCreateNewQuiz = () => {
    setIsSuccessDialogOpen(false);
    setIsCreateDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-stretch">
                        <FormLabel className="inline-flex items-center px-4 rounded-l-md bg-orange-100 text-sm font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-24">
                          Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter quiz code"
                            {...field}
                            className="rounded-l-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <SubmitButton
                  isSubmitting={form.formState.isSubmitting}
                  loadingText="Joining..."
                  buttonText="Join"
                  icon={<FaSpinner size={16} />}
                />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <CodeDialog
        isSuccessDialogOpen={isSuccessDialogOpen}
        setIsSuccessDialogOpen={setIsSuccessDialogOpen}
        handleCreateNewQuiz={handleCreateNewQuiz}
        quizCode={quizCode}
      />
    </>
  );
}
