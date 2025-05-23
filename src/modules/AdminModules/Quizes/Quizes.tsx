import { Link } from "react-router-dom";
import { DialogDemo } from "./QuizDialog";
import { FaAddressBook } from "react-icons/fa";
import { BsFillQuestionSquareFill, BsFillStopwatchFill } from "react-icons/bs";
import Results from "@/modules/SharedModules/Results/Results";
import UpcommingQuizes from "./UpcommingQuizes";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/DefaultStore";
import { QuizJoin } from "./QuizJoin";
export default function Quizes() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  return (
    <div className="grid grid-cols-12 gap-0 p-4">
      <div className="col-span-3 p-2">
        <button
          className="ol-span-12 md:col-span-6 lg:col-span-4 h-[200px]  w-[180px] border border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <BsFillStopwatchFill className="text-4xl mb-2" />
          <h1 className="text-xl font-bold">
            {user?.role === "Student" ? "Join quiz" : "Set up a new Quiz"}
          </h1>
        </button>
        {user?.role === "Student" ? (
          <QuizJoin
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
        ) : (
          <DialogDemo
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
        )}

        {user?.role === "Instructor" && (
          <Link
            to="/dashboard/questions"
            className=" flex-1 border mt-2 w-[180px] border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <BsFillQuestionSquareFill className="text-4xl mb-2" />
            <h1 className="text-xl font-bold text-center">Question Bank</h1>
          </Link>
        )}
        <Link
          to="/dashboard/results"
          className="flex-1 border mt-2 w-[180px] border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
        >
          <FaAddressBook className="text-4xl mb-2" />
          <h1 className="text-xl font-bold">Results</h1>
        </Link>
      </div>
      <div className="col-span-9 ">
        <UpcommingQuizes />
        <Results />
      </div>
    </div>
  );
}
