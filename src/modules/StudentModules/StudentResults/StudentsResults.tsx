import {
  useGetLastFiveCompletedQuizzesQuery,
  useGetQuizResultsQuery,
} from "@/store/studentsquizzes/StudentQuizzesApi";
import { useState } from "react";

export default function StudentsResults() {
  const { data: completedQuizzes = [] } = useGetLastFiveCompletedQuizzesQuery();
  const { data: results = [] } = useGetQuizResultsQuery();

  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const handleQuizClick = (quizId: string) => {
    setSelectedQuizId(quizId);
  };

  const handleBack = () => {
    setSelectedQuizId(null);
  };

  const filteredResults = results.filter((res) => res.quiz === selectedQuizId);

  return (
    <div className="border-2 rounded-lg p-4 mt-8 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        {selectedQuizId ? (
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={handleBack}
          >
            ← Back to Last Quizzes
          </button>
        ) : (
          <h3 className="font-semibold text-xl tracking-wide">
            Student Results
          </h3>
        )}
      </div>

      {selectedQuizId ? (
        <div className="overflow-x-auto">
          <h4 className="text-lg font-semibold mb-2">
            Participants for Quiz ID:{" "}
            <span className="text-blue-600">{selectedQuizId}</span>
          </h4>
          {filteredResults.length === 0 ? (
            <p>No participants found for this quiz.</p>
          ) : (
            <table className="table-auto border-collapse border w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border px-4 py-2">Student Name</th>
                  <th className="border px-4 py-2">Score</th>
                  <th className="border px-4 py-2">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((res, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="border px-4 py-2 text-center">
                      {res.student.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {res.score}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {new Date(res.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Participants</th>
              </tr>
            </thead>
            <tbody>
              {completedQuizzes.map((quiz) => (
                <tr
                  key={quiz._id}
                  className="cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleQuizClick(quiz._id)}
                >
                  <td className="border px-4 py-2">{quiz.title}</td>
                  <td className="border px-4 py-2 text-center">
                    {quiz.participants}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
