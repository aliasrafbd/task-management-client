import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import { AuthContext } from "../providers/AuthProvider";

const TaskBoard = ({ user }) => {
    const queryClient = useQueryClient();

    const {tasks, tasksRefetch} = useContext(AuthContext);

    // const { data: tasks = [] } = useQuery({
    //     queryKey: ["tasks"],
    //     queryFn: async () => {
    //         const res = await axios.get(`https://task-management-server-henna.vercel.app/tasks`);
    //         return res.data;
    //     }
    // });

    console.log(tasks);

    const updateTask = useMutation({
        mutationFn: async (task) => {
            await axios.put(`https://task-management-server-henna.vercel.app/tasks/${task._id}`, task);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks", user.email]);
        }
    });

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const taskToUpdate = tasks.find(task => task._id === active.id);
        if (taskToUpdate) {
            updateTask.mutate({ ...taskToUpdate, status: over.id });
        }
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="flex gap-4">
                <TaskColumn id="To Do" tasks={tasks.filter(task => task.status === "To Do")} />
                <TaskColumn id="In Progress" tasks={tasks.filter(task => task.status === "In Progress")} />
                <TaskColumn id="Done" tasks={tasks.filter(task => task.status === "Done")} />
            </div>
        </DndContext>
    );
};

export default TaskBoard;