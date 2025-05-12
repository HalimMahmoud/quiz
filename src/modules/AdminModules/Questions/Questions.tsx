import { useGetAllQuestionsQuery } from "@/store/questions/QuestionApi";

export default function Questions() {
  const questions = useGetAllQuestionsQuery();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bank of Questions</h1>
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
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-left text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-gray-300 px-6 py-3">Title</th>
              <th className="border border-gray-300 px-6 py-3">Description</th>
              <th className="border border-gray-300 px-6 py-3">Difficulty</th>
              <th className="border border-gray-300 px-6 py-3">Date</th>
              <th className="border border-gray-300 px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions?.data?.map((q) => (
              <tr key={q._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-6 py-4">{q.title}</td>
                <td className="border border-gray-300 px-6 py-4">
                  {q.description}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      q.difficulty === "easy"
                        ? "bg-green-100 text-green-700"
                        : q.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {new Date(q.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <button className="mr-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
