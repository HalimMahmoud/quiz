import UpcommingCard from "@/modules/SharedModules/UpcommingCard/UpcommingCard";
import { useGetIncomingQuizzesQuery } from "@/store/quizes/QuizesApi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function UpcommingQuizes() {
  const { data } = useGetIncomingQuizzesQuery();
  const location = useLocation();

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get first 2 quizzes if pathname is 'dashboard/quizes', otherwise use all
  const displayedQuizzes =
    location.pathname === "/dashboard/quizes" ? data?.slice(0, 2) : data;

  return (
    <div className="border border-gray-300 rounded-md overflow-x-auto overscroll-contain mx-8 my-4 px-4">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold py-4">Upcoming Quizzes</h1>
      <div className="flex ">
            <Link to={'/dashboard/quizes'} className="cursor-pointer">Quizes</Link >
            <span className="flex items-center"><FaLongArrowAltRight className='mx-2 text-[#C5D86D]'/> </span>
      </div>
</div>
      {displayedQuizzes?.map((quiz) => (
        <UpcommingCard
          title={quiz?.title}
          date={formatDate(quiz?.schadule)} // Pass formatted date
          enrolledStudents={quiz?.participants}
          quizId={quiz._id}
          key={quiz._id}
        />
      ))}
    </div>
  );
}
