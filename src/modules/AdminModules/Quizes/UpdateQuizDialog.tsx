import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  QuizUpdateSchema,
  type QuizUpdateFormData,
} from "@/features/validationSchema";
import type { ErrorResponse } from "@/interfaces/errors.interfaces";
import {
  useGetQuizByIDQuery,
  useUpdateQuizMutation,
} from "@/store/quizes/QuizesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

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
import type { Quiz } from "@/interfaces/quiz.interface";
import SubmitButton from "@/components/form/SubmitButton";
import { FaSpinner } from "react-icons/fa";

export function UpdateQuizDialog({ id, quiz }: { id: string; quiz: Quiz }) {
  const [UpdateQuiz] = useUpdateQuizMutation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { refetch } = useGetQuizByIDQuery(id);

  const form = useForm<QuizUpdateFormData>({
    resolver: zodResolver(QuizUpdateSchema),
    defaultValues: {
      title: quiz?.title,
      description: quiz?.description,
    },
  });

  const onSubmit: SubmitHandler<QuizUpdateFormData> = async (values) => {
    try {
      const response = await UpdateQuiz({ id, body: values }).unwrap();
      setIsCreateDialogOpen(false);

      toast.success(response?.data?.message || "Quiz updatede successfully");
      form.reset();
      await refetch(id);
    } catch (error) {
      toast.error(
        (error as ErrorResponse)?.data?.message || "Error in updating quiz"
      );
    }
  };

  return (
    <>
      {/* Create Quiz Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors duration-200 border border-blue-200 shadow-sm hover:shadow-md"
          >
            <MdOutlineSystemUpdateAlt className="text-xl" />
            <span className="text-sm font-medium">Update</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Update quiz</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-stretch">
                        <FormLabel className="inline-flex items-center px-4 rounded-l-md bg-orange-100 text-sm font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-24">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter quiz title"
                            {...field}
                            className="rounded-l-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-stretch">
                        <FormLabel className="inline-flex items-center px-4 rounded-l-md bg-orange-100 text-sm font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-24">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter quiz discription"
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
                  loadingText="Updating..."
                  buttonText="Update"
                  icon={<FaSpinner size={16} />}
                />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
