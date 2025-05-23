import { format, parseISO } from 'date-fns'; // Add date-fns for date formatting


import { useDeleteQuizMutation, useGetQuizByIDQuery, useUpdateQuizMutation } from "@/store/quizes/QuizesApi";
import { toast } from "sonner";
import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Loading from '@/modules/SharedModules/Loading/Loading';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Copy, Trash2 } from "lucide-react"
import { Button } from '@/components/ui/button';
import DeleteConfirmation from '@/modules/SharedModules/DeleteConfirmation/DeleteConfirmation';
import { UpdateQuizDialog } from './UpdateQuizDialog';



export default function QuizeData() {
    const { quizId } = useParams();
    const [updateQuiz] = useUpdateQuizMutation();
    const [deleteQuiz] = useDeleteQuizMutation();
    const { data, isLoading } = useGetQuizByIDQuery(quizId || "");


    const formatQuizDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const formatQuizTime = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'HH:mm');
    };
    const copyQuizCode = () => {
        navigator.clipboard.writeText(data?.code);
        toast.success("Quiz code copied to clipboard!");
    };
    if (isLoading) return <Loading />;
    return (
        <>
            <h3 className="flex px-2 mt-4 ">
                <Link to={'/dashboard/quizes'} className="cursor-pointer font-bold">Quizzes</Link >
                <span className="flex items-center font-medium"><FaLongArrowAltRight className='mx-2 text-[#C5D86D]' /> <span>Data Structure {data?.title}</span></span>
            </h3>
            <div className="space-y-4 py-4 max-w-2xl border border-gray-300 rounded-md overflow-x-auto overscroll-contain mx-8 my-4 px-4">
                <h1 className="text-xl font-bold"> Data Structure {data?.title}</h1>
                <div className="flex items-center gap-8 text-[20px]">
                    <span className='flex items-center gap-2'>
                        < MdDateRange className="font-bold" />
                        <span>{data?.schadule ? formatQuizDate(data.schadule) : 'N/A'}</span>
                    </span>
                    <span className='flex items-center gap-2'>
                        <IoMdTime className="font-bold" />
                        <span>{data?.schadule ? formatQuizTime(data.schadule) : 'N/A'}</span>
                    </span>

                </div>
                <div className="space-y-4">
                    {/* duration */}
                    <div className="flex items-stretch border rounded-md  border-gray-300">
                        <p className="inline-flex items-center px-4 py-2 rounded-l-md bg-orange-100 text-sm font-medium  whitespace-nowrap min-w-24">
                            Duration
                        </p>
                        <p className=" px-4 py-2 w-full">
                            {data?.duration || 0}
                        </p>
                    </div>
                    {/* Number of Questions */}
                    <div className="flex items-stretch border rounded-md  border-gray-300">
                        <p className="inline-flex items-center px-4 py-2 rounded-l-md bg-orange-100 text-sm font-medium  whitespace-nowrap min-w-24">
                            Questions
                        </p>
                        <p className=" rounded rounded-l-none px-4 py-2 w-full">
                            {data?.questions_number || 0}
                        </p>
                    </div>
                    {/* Description */}
                    <div className="flex items-stretch border rounded-md  border-gray-300 flex-col">
                        <p className="inline-flex items-center px-4 py-2 rounded-l-md bg-orange-100 text-sm font-medium  whitespace-nowrap min-w-24">
                            Description
                        </p>
                        <p className=" rounded rounded-l-none px-4 py-2 w-full">
                            {data?.description || "No description provided"}
                        </p>
                    </div>

                    {/* Difficulty */}
                    <div className="flex items-stretch border rounded-md  border-gray-300">
                        <p className="inline-flex items-center px-4 py-2 rounded-l-md bg-orange-100 text-sm font-medium  whitespace-nowrap min-w-24">
                            Difficulty
                        </p>
                        <p className=" rounded rounded-l-none px-4 py-2 w-full">
                            {data?.difficulty || "Not specified"}
                        </p>
                    </div>

                    {/* Type */}
                    <div className="flex items-stretch border rounded-md  border-gray-300">
                        <p className="inline-flex items-center px-4 py-2 rounded-l-md bg-orange-100 text-sm font-medium  whitespace-nowrap min-w-24">
                            Type
                        </p>
                        <p className=" rounded rounded-l-none px-4 py-2 w-full">
                            {data?.type || "Standard"}
                        </p>
                    </div>

                    {/* Code */}
                    <div className="flex items-stretch border rounded-md  border-gray-300">
                        <p className="inline-flex items-center px-4 py-2 rounded-l-md bg-orange-100 text-sm font-medium  whitespace-nowrap min-w-24">
                            Code
                        </p>
                        <p className=" rounded rounded-l-none px-4 py-2 w-full font-mono">
                            {data?.code || "N/A"}
                        </p>
                        <Button
                            type="button"
                            // variant="outline"
                            size="lg"
                            onClick={copyQuizCode}
                            className="px-3 cursor-pointer"
                        >
                            <Copy className="" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">

                    <DeleteConfirmation questionId={quizId || ""} >
                        <button
                            className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 transition-colors duration-200 border border-red-200 shadow-sm hover:shadow-md"
                        >
                            <Trash2 className="text-xl" />
                            <span className="text-sm font-medium">delete</span>
                        </button>
                    </DeleteConfirmation>

                    <UpdateQuizDialog
                        id={quizId || ""}
                        quiz={data}
                    />
                </div>
            </div>
        </>
    );
}