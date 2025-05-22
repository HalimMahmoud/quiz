import { Link } from "react-router-dom";
import { DialogDemo } from "./QuizDialog";
import { FaAddressBook } from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import Results from "@/modules/SharedModules/Results/Results";
export default function Quizes() {
  return (
    <div className="grid grid-cols-12 gap-0 p-4">
        <div className="col-span-3 p-2">
      <DialogDemo/>
          <Link
            to="/dashboard/questions"
            className=" flex-1 border mt-2 w-[180px] border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <BsFillQuestionSquareFill className="text-4xl mb-2" />
            <h1 className="text-xl font-bold text-center">Question Bank</h1>
          </Link>
          <Link
            to="/dashboard/results"
            className="flex-1 border mt-2 w-[180px] border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <FaAddressBook className="text-4xl mb-2" />
            <h1 className="text-xl font-bold">Results</h1>
          </Link>
      </div>
      <div className="col-span-9 ">
        <Results /> 
    </div>
    </div>
  )
}
