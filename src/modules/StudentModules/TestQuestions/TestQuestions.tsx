import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetQuestionsWithoutAnswersQuery,
  useSubmitQuizMutation,
} from "@/store/quizes/QuizesApi";
import type { TestResponseObject } from "@/interfaces/test.interfaces";
import Loading from "@/modules/SharedModules/Loading/Loading";
import SubmitButton from "@/components/form/SubmitButton";
import { FaSpinner } from "react-icons/fa";
import { isAxiosError } from "axios";

export default function TestQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitQuiz] = useSubmitQuizMutation();

  const { data, isLoading } =
    useGetQuestionsWithoutAnswersQuery<TestResponseObject>(id as string);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Countdown Timer Logic (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (formData: { [questionId: string]: string }) => {
    try {
      const answers = data?.data.questions.map((question) => ({
        question: question._id,
        answer: formData[question._id],
      }));

      if (id) {
        const res = await submitQuiz({
          id,
          body: { answers },
        }).unwrap();

        toast.success(res?.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while submitting the quiz."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    navigate("/");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">{data.data.title}</h1>
          <p className="text-lg mb-4">
            Time Remaining: {Math.floor(timeRemaining / 60)}:
            {String(timeRemaining % 60).padStart(2, "0")}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.data.questions.map((question, index) => (
                <div key={question._id} className="p-4 border rounded-lg">
                  <h2 className="text-lg font-semibold">
                    {index + 1}. {question.title}
                  </h2>
                  <div className="mt-2">
                    {Object.entries(question.options)
                      .filter(([key]) => ["A", "B", "C", "D"].includes(key))
                      .map(([key, value], idx) => (
                        <div key={idx} className="flex items-center mb-2">
                          <input
                            type="radio"
                            id={`${question._id}_${key}`}
                            {...register(question._id, { required: true })}
                            value={key}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`${question._id}_${key}`}
                            className="text-gray-700"
                          >
                            {value}
                          </label>
                        </div>
                      ))}
                    {errors[question._id] && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select an answer.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <SubmitButton
                isSubmitting={isSubmitting}
                loadingText="Submitting..."
                buttonText="Submit Quiz"
                icon={<FaSpinner size={16} />}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
