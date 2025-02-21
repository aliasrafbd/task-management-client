import { useContext, useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query"; 
import axiosPublic from "../hooks/useAxiosPublic";
import DroppableColumn from "../components/DroppableColumn";
import AddTask from "../components/AddTask";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";
import TaskChart from "../components/TaskChart";
import LoginLogout from "../components/LoginLogout";

const categories = ["To-Do", "In Progress", "Done"];

const Home = () => {
    const { user, tasks, tasksRefetch } = useContext(AuthContext); 
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient(); 

    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        tasksRefetch();
    }, []);

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        console.log("Active ID:", activeId);
        console.log("Over ID:", overId);

        const draggedTask = tasks.find((task) => task._id === activeId);
        if (!draggedTask) return;

        const newCategory = categories.find((cat) => cat.trim() === over.id.trim());
        const oldCategory = draggedTask.category;

        console.log("New Category:", newCategory);
        console.log("Old Category:", oldCategory);

        if (newCategory && newCategory !== oldCategory) {
            try {
                await axiosPublic.put(`/taskscategory/${activeId}`, { category: newCategory });
                tasksRefetch();
                queryClient.invalidateQueries(["taskCounts"]); 
            } catch (error) {
            }
            return;
        }

        const sameCategoryTasks = tasks.filter(task => task.category === oldCategory);
        const oldIndex = sameCategoryTasks.findIndex(task => task._id === activeId);
        const newIndex = sameCategoryTasks.findIndex(task => task._id === overId);

        if (oldIndex !== -1 && newIndex !== -1) {
            const sortedTasks = arrayMove(sameCategoryTasks, oldIndex, newIndex);

            try {
                await axios.put("https://task-management-server-henna.vercel.app/alltasks/sort", {
                    category: oldCategory,
                    sortedTasks: sortedTasks.map(task => ({ _id: task._id })),
                });
                tasksRefetch();
            } catch (error) {
            }
        }
    };

    const handleDeleteTask = async (taskId) => {
        console.log("want to delete task");
        try {
            await axiosPublic.delete(`/tasks/${taskId}`);
            tasksRefetch();
            queryClient.invalidateQueries(["taskCounts"]); 
        } catch (error) {
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="font-bold text-red-700">Please login first to use Task Management Apps </h1><br />
                <div>
                    <LoginLogout />
                </div>
            </div>
        );
    }

    return (
        <div className="py-4 max-w-7xl mx-auto">
            <TaskChart />
            <AddTask refreshTasks={tasksRefetch} />
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                    {categories.map(category => (
                        <DroppableColumn
                            key={category}
                            category={category}
                            tasks={tasks.filter((task) => task.category === category)}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default Home;