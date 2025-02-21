import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic"; // Custom Axios hook
import { useQuery } from "@tanstack/react-query";

const TaskSummary = () => {
    const axiosPublic = useAxiosPublic();

    // ✅ Fetch Task Counts using TanStack Query
    const { data: taskCounts = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ["taskCounts"],
        queryFn: async () => {
            const response = await axiosPublic.get("/tasks/count");
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    if (isLoading) return <p>Loading task counts...</p>;
    if (isError) return <p className="text-red-500">Error fetching task counts</p>;

    return (
        <div className="py-6 grid grid-cols-2 justify-between">
            <h2 className="text-lg font-semibold mb-2 text-left">Task Summary</h2>
            <div className="flex gap-2 justify-end">
                <p className="text-blue-500 font-medium">To-Do: {taskCounts["To-Do"] || 0}</p>
                <p className="text-yellow-500 font-medium">In Progress: {taskCounts["In Progress"] || 0}</p>
                <p className="text-green-500 font-medium">Done: {taskCounts["Done"] || 0}</p>
            </div>
        </div>
    );
};

export default TaskSummary;