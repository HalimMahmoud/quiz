import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useState, type ReactNode } from "react";
import {
  useUpdateQuestionMutation,
  useCreateQuestionMutation,
  type Question,
} from "@/store/questions/QuestionApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function QuestionDialog({
  question,
  viewMode,
  children,
}: {
  question?: Question;
  viewMode?: boolean;
  children?: ReactNode;
}) {
  const [updateQuestion] = useUpdateQuestionMutation();
  const [createQuestion] = useCreateQuestionMutation();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Question, "_id">>({
    mode: "onChange",
    defaultValues: {
      title: question?.title ?? "",
      description: question?.description ?? "",
      options: {
        A: question?.options.A ?? "",
        B: question?.options.B ?? "",
        C: question?.options.C ?? "",
        D: question?.options.D ?? "",
      },
      answer: question?.answer ?? "A",
      type: question?.type ?? "FE",
      difficulty: question?.difficulty ?? "easy",
    },
  });

  const onValid = async (data: Omit<Question, "_id">) => {
    try {
      if (question) {
        await updateQuestion({ id: question._id, data });
      } else {
        await createQuestion(data);
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden [&>button]:hidden">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="border-b relative h-[50px]">
            <DialogTitle className="text-base font-medium p-4 float-left">
              {viewMode
                ? "View question"
                : question
                ? "Update question"
                : "Set up a new question"}
            </DialogTitle>
            <div className="h-full flex float-right">
              {!viewMode && (
                <Button
                  variant="ghost"
                  type="submit"
                  className="h-full rounded-none px-4 text-green-600 hover:bg-green-50 hover:text-green-700 border-l"
                  disabled={isSubmitting}
                >
                  <Check className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="h-full rounded-none px-4 text-red-600 hover:bg-red-50 hover:text-red-700 border-l"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Title */}
            <div className="flex items-center">
              <div className="min-w-[100px] bg-[#fff5eb] p-2 rounded-l-md border border-r-0 border-gray-300">
                <Label htmlFor="title" className="text-sm">
                  Title
                </Label>
              </div>
              <Input
                id="title"
                disabled={viewMode}
                {...register("title", { required: "Title is required" })}
                className="border-gray-300 rounded-l-none flex-1"
              />
            </div>
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}

            {/* Description */}
            <div className="flex">
              <div className="min-w-[100px] bg-[#fff5eb] p-2 rounded-l-md border border-r-0 border-gray-300 self-start">
                <Label htmlFor="description" className="text-sm">
                  Description
                </Label>
              </div>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                disabled={viewMode}
                className="min-h-[80px] border-gray-300 rounded-l-none flex-1"
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}

            {/* Options */}
            {(["A", "B", "C", "D"] as const).map((letter) => (
              <div key={letter} className="flex items-center">
                <div className="min-w-[40px] bg-[#fff5eb] p-2 rounded-l-md border border-r-0 border-gray-300">
                  <Label htmlFor={`option${letter}`} className="text-sm">
                    {letter}
                  </Label>
                </div>
                <Input
                  id={`option${letter}`}
                  {...register(`options.${letter}`, {
                    required: `Option ${letter} is required`,
                  })}
                  disabled={viewMode}
                  className="border-gray-300 rounded-l-none flex-1"
                />
                {errors.options?.[letter] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.options[letter]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Select Fields */}
            <div className="grid grid-cols-3 gap-4">
              {/* Right Answer */}
              <div className="flex items-center">
                <div className="min-w-[100px] bg-[#fff5eb] p-2 rounded-l-md border border-r-0 border-gray-300">
                  <Label className="text-sm">Right Answer</Label>
                </div>
                <Controller
                  name="answer"
                  control={control}
                  rules={{ required: "Answer is required" }}
                  render={({ field }) => (
                    <Select
                      disabled={viewMode}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="border-gray-300 rounded-l-none flex-1">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A", "B", "C", "D"].map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Category Type */}
              <div className="flex items-center">
                <div className="min-w-[100px] bg-[#fff5eb] p-2 rounded-l-md border border-r-0 border-gray-300">
                  <Label className="text-sm">Category type</Label>
                </div>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <Select
                      disabled={viewMode}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="border-gray-300 rounded-l-none flex-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FE">Frontend</SelectItem>
                        <SelectItem value="BE">Backend</SelectItem>
                        <SelectItem value="DO">DevOps</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Difficulty Level */}
              <div className="flex items-center">
                <div className="min-w-[100px] bg-[#fff5eb] p-2 rounded-l-md border border-r-0 border-gray-300">
                  <Label className="text-sm">Difficulty</Label>
                </div>
                <Controller
                  name="difficulty"
                  control={control}
                  rules={{ required: "Difficulty is required" }}
                  render={({ field }) => (
                    <Select
                      disabled={viewMode}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="border-gray-300 rounded-l-none flex-1">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
