import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillStopwatchFill } from "react-icons/bs";
import { privateAxiosInstance } from "@/services/api/ApiInstance";
import { STUDENT_QUIZ } from "../../services/api/ApiConfig";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

interface QuizItem {
  img: string;
  title: string;
}

interface CompletedQuizItem {
  title: string;
  status: string;
  difficulty: string;
  createdAt: string;
}

const StudentQuiz = () => {
  const navigate = useNavigate();
  const [coming, setComing] = useState<QuizItem[]>([]);
  const [completed, setCompleted] = useState<CompletedQuizItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [join, setJoin] = useState(false);
  const [code, setCode] = useState("");

  const getCommingQuizzes = async () => {
    try {
      const response = await privateAxiosInstance.get(STUDENT_QUIZ.INCOMING);

      const modifiedData = response.data.map((item: any) => ({
        img: item.img,
        title: item.title.toUpperCase(),
      }));

      setComing(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedQuizzes = async () => {
    try {
      const response = await privateAxiosInstance.get(STUDENT_QUIZ.COMPLETED);

      const modifiedCompleted = response.data.map((item: any) => ({
        title: item.title,
        status: item.status,
        difficulty: item.difficulty,
        createdAt: new Date(item.createdAt).toISOString(),
      }));

      setCompleted(modifiedCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToJoin = async (code: any) => {
    try {
      const response = await privateAxiosInstance.post(STUDENT_QUIZ.JOIN, {
        code,
      });
      navigate(`/dashboard/test/${response.data.quiz}`);
      setJoin(response.data);
    } catch (error) {
      console.log("join");

      console.log(error);
    }
  };

  useEffect(() => {
    getCommingQuizzes();
    getCompletedQuizzes();
  }, []);

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCode("");
  };

  return (
    <div className="quiz p-8">
      <div className="container mx-auto">
        <div className="head flex gap-4 mb-6 max-w-md">
          <button
            onClick={handleJoinClick}
            className="flex-1 border border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <BsFillStopwatchFill className="text-4xl mb-2" />
            <h1 className="text-xl font-bold">Join Quiz</h1>
          </button>
          <Link
            to="/dashboard/results"
            className="flex-1 border border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <BsFillStopwatchFill className="text-4xl mb-2" />
            <h1 className="text-xl font-bold">Results</h1>
          </Link>
        </div>

        <div className="content flex flex-col lg:flex-row gap-6">
          {/* Left Section - Upcoming Quizzes */}
          <div className="left flex-1 border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
            <h2 className="text-2xl font-semibold mb-4">Upcoming quizzes</h2>

            {coming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coming.map((item, index) => (
                  <div
                    key={index}
                    className="card-content border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h1 className="text-lg font-medium">{item.title}</h1>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  No quizzes available
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  There are no upcoming quizzes at the moment. Please check back
                  later.
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Completed Quizzes */}
          <div className="right flex-1 border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
            <div className="head-right mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Completed Quizzes</h2>
              <Link
                to="/dashboard/results"
                className="text-black hover:text-green-600 transition flex items-center gap-1"
              >
                results
                <FiArrowRight className="text-green-500" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-sm">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">Title</th>
                    <th className="px-4 py-2 border border-gray-200">Status</th>
                    <th className="px-4 py-2 border border-gray-200">
                      Difficulty
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border border-gray-200">
                        {item.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.status}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.difficulty}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-10 w-full max-w-xl shadow-lg relative text-center">
              <h2 className="text-3xl font-bold mb-6">Join Quiz</h2>
              <p className="text-gray-600 mb-3">
                Input the code received for the quiz below to join
              </p>

              <div className="flex items-stretch justify-center mb-8 max-w-md mx-auto">
                <span className="inline-flex items-center px-4 rounded-l-md bg-[#FFEDDF] text-sm font-medium border border-r-0 border-gray-300 whitespace-nowrap">
                  Code
                </span>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your code"
                  className="w-full border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-center items-center gap-4">
                <AiOutlineCheckCircle
                  onClick={() => {
                    if (!code.trim()) {
                      alert("Please enter a code first!");
                      return;
                    }
                    fetchToJoin(code);
                    setShowModal(false);
                  }}
                  className="text-4xl text-green-500 cursor-pointer hover:scale-110 transition"
                />

                <AiOutlineCloseCircle
                  onClick={handleCloseModal}
                  className="text-4xl text-red-500 cursor-pointer hover:scale-110 transition"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuiz;
