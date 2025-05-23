import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuizSchema, type QuizFormData } from "@/features/validationSchema";
import type { ErrorResponse } from "@/interfaces/errors.interfaces";
import { useCreateQuizMutation } from "@/store/quizes/QuizesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { BsFillStopwatchFill } from "react-icons/bs"

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
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { privateAxiosInstance } from "@/services/api/ApiInstance";
import CodeDialog from "./CodeDialog";
import SubmitButton from "@/components/form/SubmitButton";
import { FaSpinner } from "react-icons/fa";

interface Group {
  _id: string;
  name: string;
}

export function DialogDemo() {
  const [createQuiz] = useCreateQuizMutation();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [quizCode, setQuizCode] = useState("");
  
  const form = useForm<QuizFormData>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      title: "",
      description: "",
      group: "",
      questions_number: "",
      difficulty: "",
      type: "",
      schadule: "",
      duration: "",
      score_per_question: "",
    },
  });

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoadingGroups(true);
      try {
        const response = await privateAxiosInstance.get('/group');
        setGroups(response.data || []);
      } catch (error) {
        toast.error("Failed to load groups");
      } finally {
        setIsLoadingGroups(false);
      }
    };

    fetchGroups();
  }, []);

  const onSubmit: SubmitHandler<QuizFormData> = async (values) => {
    try {
      const transformedValues = {
        ...values,
        questions_number: parseInt(values.questions_number),
        duration: parseInt(values.duration),
        score_per_question: parseInt(values.score_per_question),
        schadule: new Date(values.schadule).toISOString(),
      };
      
      const response = await createQuiz(transformedValues).unwrap();      
      setIsCreateDialogOpen(false);
      setQuizCode(response?.data?.code || "");
      setIsSuccessDialogOpen(true);
      
      toast.success(response?.data?.message || "Quiz created successfully");
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
      {/* Create Quiz Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="ol-span-12 md:col-span-6 lg:col-span-4 h-[200px]  w-[180px] border border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <BsFillStopwatchFill className="text-4xl mb-2" />
            <h1 className="text-xl font-bold">Set up a new Quiz</h1>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Set up a new quiz</DialogTitle>
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

                <div className="grid grid-cols-3 gap-2">
                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-stretch">
                          <FormLabel className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                            Duration
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-l-none text-sm">
                                <SelectValue placeholder="Minutes" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[15, 30, 45, 60, 90, 120, 180].map((duration) => (
                                <SelectItem key={duration} value={duration.toString()}>
                                  {duration}m
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Questions Number */}
                  <FormField
                    control={form.control}
                    name="questions_number"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-stretch">
                          <FormLabel className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                            Questions
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-l-none text-sm">
                                <SelectValue placeholder="Count" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 5, 10, 15, 20, 25, 30, 40, 50].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Score per Question */}
                  <FormField
                    control={form.control}
                    name="score_per_question"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-stretch">
                          <FormLabel className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                            Score
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-l-none text-sm">
                                <SelectValue placeholder="Points" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 10].map((score) => (
                                <SelectItem key={score} value={score.toString()}>
                                  {score}pt
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Field */}
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
                          <Textarea
                            placeholder="Enter quiz description"
                            {...field}
                            className="rounded-l-none min-h-20"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Schedule Field */}
                <FormField
                  control={form.control}
                  name="schadule"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-stretch">
                        <FormLabel className="inline-flex items-center px-4 rounded-l-md bg-orange-100 text-sm font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-24">
                          Schedule
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            className="rounded-l-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Difficulty, Type, Group Select - Same Row */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Difficulty */}
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-stretch">
                          <FormLabel className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                            Difficulty
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-l-none text-sm">
                                <SelectValue placeholder="Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-stretch">
                          <FormLabel className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                            Type
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-l-none text-sm">
                                <SelectValue placeholder="Quiz type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="FE">Frontend</SelectItem>
                              <SelectItem value="BE">Backend</SelectItem>
                              <SelectItem value="DO">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Group Select */}
                  <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-stretch">
                          <FormLabel className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                            Group
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-l-none text-sm">
                                <SelectValue placeholder={isLoadingGroups ? "Loading..." : "Select group"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {groups.map((group) => (
                                <SelectItem key={group._id} value={group._id}>
                                  {group.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button>
                <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          loadingText="creating..."
          buttonText="create"
          icon={<FaSpinner size={16} />}
        />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
                    <CodeDialog 
                    isSuccessDialogOpen={isSuccessDialogOpen} 
                    setIsSuccessDialogOpen={setIsSuccessDialogOpen}
                    handleCreateNewQuiz={handleCreateNewQuiz}
                    quizCode={quizCode}
                    />
    </>
  );
}