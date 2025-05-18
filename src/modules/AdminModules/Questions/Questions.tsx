import { useGetAllQuestionsQuery } from "@/store/questions/QuestionApi";
import QuestionsTableBody from "./QuestionTableBody";
import QuestionDialog from "./QuestionDialog";

export default function Questions() {
  const { data, isLoading } = useGetAllQuestionsQuery();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="border rounded-md flex flex-col p-4 h-full">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bank of Questions</h1>
          <QuestionDialog>
            <button className="flex items-center justify-center gap-3 rounded-full border border-black py-2 px-3 hover:bg-black hover:text-white transition-colors">
              <div className="flex items-center justify-center bg-black rounded-full h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              Add Question
            </button>
          </QuestionDialog>
        </div>
        <div className=" flex-1 flex-col overflow-hidden">
          {/* scroll container */}
          <div className="h-full overflow-auto overscroll-contain">
            {/* table fills parent */}
            <table className="min-w-full h-full w-full border border-gray-300 text-left text-sm table-auto">
              <thead className="bg-black text-white">
                <tr>
                  <th className="border border-gray-300 px-6 py-3">Title</th>
                  <th className="border border-gray-300 px-6 py-3">
                    Description
                  </th>
                  <th className="border border-gray-300 px-6 py-3">
                    Difficulty
                  </th>
                  <th className="border border-gray-300 px-6 py-3">Type</th>
                  <th className="border border-gray-300 px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="h-full">
                <QuestionsTableBody data={data} isLoading={isLoading} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
