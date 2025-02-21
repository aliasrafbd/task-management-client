import { useContext, useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import axiosPublic from "../hooks/useAxiosPublic";
import DroppableColumn from "../components/DroppableColumn";
import AddTask from "../components/AddTask";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";
import TaskSummary from "../components/TaskSummary";
import TaskChart from "../components/TaskChart";
import LoginLogout from "../components/LoginLogout";

const categories = ["To-Do", "In Progress", "Done"];

const Home = () => {
    const { user, tasks, tasksRefetch } = useContext(AuthContext); // Get user from AuthContext
    const axiosPublic = useAxiosPublic();

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

        // Find the dragged task
        const draggedTask = tasks.find((task) => task._id === activeId);
        if (!draggedTask) return;

        // Check if dragging to a new category
        const newCategory = categories.find((cat) => cat.trim() === over.id.trim());
        const oldCategory = draggedTask.category;

        console.log("New Category:", newCategory);
        console.log("Old Category:", oldCategory);

        if (newCategory && newCategory !== oldCategory) {
            console.log("🛠 Moving task to a new category:", newCategory);

            try {
                await axiosPublic.put(`/taskscategory/${activeId}`, { category: newCategory });
                console.log("✅ Task moved to a new category:", newCategory);
                tasksRefetch(); // Refresh tasks after moving
            } catch (error) {
                console.error("❌ Error updating task category:", error);
            }
            return;
        }

        // If reordering within the same category
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

                console.log("✅ Tasks reordered successfully!");
                tasksRefetch();
            } catch (error) {
                console.error("❌ Error sorting tasks:", error);
            }
        }
    };

    // ✅ Handle Task Deletion
    const handleDeleteTask = async (taskId) => {
        console.log("want to delete task");
        try {
            await axiosPublic.delete(`/tasks/${taskId}`);
            tasksRefetch();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // 🚀 If user is NOT logged in, show only LoginLogout
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
                <div className="grid grid-cols-3 gap-4">
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