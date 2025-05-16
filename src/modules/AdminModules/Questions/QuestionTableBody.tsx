import type { Question } from "@/store/questions/QuestionApi";
import QuestionDialog from "./QuestionDialog";
import DeleteConfirmation from "@/modules/SharedModules/DeleteConfirmation/DeleteConfirmation";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Loading from "@/modules/SharedModules/Loading/Loading";
import NoData from "@/modules/SharedModules/NoData/NoData";

export default function QuestionsTableBody({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: Question[] | undefined;
}) {
  if (isLoading)
    return (
      <tr>
        <td colSpan={5}>
          <Loading />
        </td>
      </tr>
    );

  if (!data)
    return (
      <tr>
        <td colSpan={5}>
          <NoData item="question" />
        </td>
      </tr>
    );
  return (
    <>
      {data?.map((question) => (
        <tr key={question._id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-6 py-3">{question.title}</td>
          <td className="border border-gray-300 px-6 py-3">
            {question.description}
          </td>
          <td className="border border-gray-300 px-6 py-3">
            <span
              className={`rounded px-2 py-1 text-xs font-semibold capitalize ${
                question.difficulty === "easy"
                  ? "bg-green-100 text-green-700"
                  : question.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {question.difficulty}
            </span>
          </td>
          <td className="border border-gray-300 px-6 py-3">
            <span
              className={`rounded px-2 py-1 text-xs font-semibold capitalize ${
                question.type === "FE"
                  ? "bg-green-100 text-green-700"
                  : question.type === "BE"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {question.type}
            </span>
          </td>
          <td className="border border-gray-300 px-6 py-3">
            <div className="flex">
              <QuestionDialog question={question} viewMode>
                <Eye />
              </QuestionDialog>

              <QuestionDialog question={question}>
                <SquarePen />
              </QuestionDialog>
              <DeleteConfirmation questionId={question._id}>
                <Trash2 />
              </DeleteConfirmation>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
