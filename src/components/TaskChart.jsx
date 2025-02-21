import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosPublic from "../hooks/useAxiosPublic";

const COLORS = ["#3498db", "#f1c40f", "#2ecc71"]; // Colors for To-Do, In Progress, Done

const TaskChart = () => {
    const axiosPublic = useAxiosPublic();

    // ✅ Fetch Task Counts
    const { data: taskCounts = {}, isLoading, isError } = useQuery({
        queryKey: ["taskCounts"],
        queryFn: async () => {
            const response = await axiosPublic.get("/tasks/count");
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    if (isLoading) return <p>Loading task chart...</p>;
    if (isError) return <p className="text-red-500">Error loading task chart</p>;

    // ✅ Format data for chart
    const chartData = [
        { name: "To-Do", value: taskCounts["To-Do"] || 0 },
        { name: "In Progress", value: taskCounts["In Progress"] || 0 },
        { name: "Done", value: taskCounts["Done"] || 0 }
    ];

    return (
        <div className="">
            <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                    <Pie 
                        data={chartData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={50} 
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TaskChart;