import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useParams, useLocation, Link } from "react-router-dom";
  import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import type { QuizResultData } from "@/interfaces/results.interface";

 
  
  export default function QuizResultDetails() {
    const { quizId } = useParams<{ quizId: string }>();
    const location = useLocation();
    const [resultData, setResultData] = useState<QuizResultData | null>(null);  
    useEffect(() => {
      const state = location.state as { resultData?: QuizResultData };
            
        if (state.resultData) {
          setResultData(state.resultData);
          console.log(state.resultData);
          
        } else {
          setResultData(null);
        }
     
    }, [quizId, location.state]);
  
    // Calculate duration between started_at and finished_at in minutes and seconds
    const calculateDuration = (startTime: string, endTime: string): string => {
        const start = new Date(startTime);
        const end = new Date(endTime);
      
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return "N/A";
        }
      
        const durationMs = end.getTime() - start.getTime();
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
      
        return `${minutes}m ${seconds}s`;
      };
  
   
  
    return (
      <div className=" mx-auto p-6">
        <div className="mb-6">
          <h1 className="flex ">
            <Link to={'/dashboard/results'} className="cursor-pointer">Quizes</Link >
            <span className="flex items-center"><FaLongArrowAltRight className='mx-2 text-[#C5D86D]'/> <span>Data Structure {resultData?.quiz.title}</span></span>
            </h1>
        </div>
  
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <Table className="w-full table-auto">
            <TableHeader>
              <TableRow className="bg-black hover:bg-black">
                <TableHead className="border-r border-b border-gray-300 px-6 py-3 text-white font-medium">Participant</TableHead>
                <TableHead className="border-r border-b border-gray-300 px-6 py-3 text-white font-medium">Email</TableHead>
                <TableHead className="border-r border-b border-gray-300 px-6 py-3 text-white font-medium">Score</TableHead>
                <TableHead className="border-b border-gray-300 px-6 py-3 text-white font-medium">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultData?.participants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No participants found for this quiz.
                  </TableCell>
                </TableRow>
              ) : (
                resultData?.participants.map((participant) => (
                  <TableRow key={participant._id} className="hover:bg-gray-50">
                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">
                      {`${participant.participant.first_name} ${participant.participant.last_name}`}
                    </TableCell>
                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">
                      {participant.participant.email}
                    </TableCell>
                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">
                      {participant.score}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 px-6 py-3">
                    {calculateDuration(participant.started_at, participant.finished_at)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }