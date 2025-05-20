import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RESULT_ULR } from "@/services/api/ApiConfig";
import { privateAxiosInstance } from "@/services/api/ApiInstance";
import { useGetAllResultsQuery } from "@/store/auth/ResultApi";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import type { GroupData, Result } from "@/interfaces/results.interface";



export default function Results() {
    const { data: resultsData, isLoading: resultsLoading } = useGetAllResultsQuery(undefined) as { data: Result[]; isLoading: boolean };
    const [modifiedResults, setModifiedResults] = useState<Result[]>([]);
    const [loadingGroups, setLoadingGroups] = useState<boolean>(true);

    useEffect(() => {
        const fetchGroupData = async () => {
            if (resultsData && resultsData.length > 0) {
                setLoadingGroups(true);
                const groupIds = [...new Set(resultsData.map(result => result.quiz?.group).filter(Boolean))];
                const groupData: Record<string, GroupData> = {};
                const successfulGroupIds = new Set<string>();

                // Fetch data for each group
                await Promise.all(
                    groupIds.map(async (groupId) => {
                        try {
                            const response = await privateAxiosInstance.get<GroupData>(RESULT_ULR.GET_GROUP_BY_ID(groupId));

                            if (response && response.data && response.data.name && response.data.students) {
                                groupData[groupId] = response.data;
                                successfulGroupIds.add(groupId);
                            }
                        } catch {
                            // Handle errors silently
                        }
                    })
                );

                // Only include results whose group was successfully fetched
                const enriched = resultsData
                    .filter(result => result.quiz?.group && successfulGroupIds.has(result.quiz.group))
                    .map(result => ({
                        ...result,
                        groupData: groupData[result.quiz.group],
                    }));
                setModifiedResults(enriched);
                setLoadingGroups(false);
            }
        };

        if (resultsData) {
            fetchGroupData();
        }
    }, [resultsData]);

    // Format date function
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <>
            <div className="border border-gray-300 rounded-md overflow-x-auto overscroll-contain mx-8 my-4">
                <h1 className="text-2xl font-bold py-4">Completed Quizzes</h1>

                <Table className="w-full table-auto">
                    <TableHeader>
                        <TableRow className="bg-black hover:bg-black">
                            <TableHead className="border-r border-b border-gray-300 px-6 py-3 text-white font-medium">Title</TableHead>
                            <TableHead className="border-r border-b border-gray-300 px-6 py-3 text-white font-medium">Group name</TableHead>
                            <TableHead className="border-r border-b border-gray-300 px-6 py-3 text-white font-medium">No. of persons in group</TableHead>
                            <TableHead className="border-b border-gray-300 px-6 py-3 text-white font-medium">Participants</TableHead>
                            <TableHead className="border-b border-gray-300 px-6 py-3 text-white font-medium">Date</TableHead>
                            <TableHead className="border-b border-gray-300 px-6 py-3 text-white font-medium"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(resultsLoading || loadingGroups) ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Loading />
                                </TableCell>
                            </TableRow>
                        ) : modifiedResults.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">No completed quizzes found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            modifiedResults.map((result) => (
                                <TableRow key={result._id} className="hover:bg-gray-50">
                                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">{result?.quiz?.title || "N/A"}</TableCell>
                                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">{result?.groupData?.name}</TableCell>
                                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">{result?.groupData?.students?.length}</TableCell>
                                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">{result?.participants?.length || 0}</TableCell>
                                    <TableCell className="border-r border-b border-gray-300 px-6 py-3">{formatDate(result?.quiz?.closed_at)}</TableCell>
                                    <TableCell className="border-b border-gray-300 py-3">
                                        <Link 
                                            to={`${result?.quiz?._id}`} 
                                            state={{ resultData: result }}
                                            className="rounded-md px-3 py-2 font-medium flex items-center justify-center gap-2 bg-[#C5D86D] text-black hover:bg-[#b3c55f] transition-colors"
                                        >
                                            <IoEyeOutline />
                                            <span>View</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}