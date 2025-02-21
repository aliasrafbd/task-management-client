// TaskColumn.jsx
import React from "react"; // Ensure React is imported
import { SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard"; // Ensure TaskCard is correctly imported

const TaskColumn = ({ id, tasks }) => {
    return (
        <div className="w-1/3 p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-bold mb-2">{id}</h2>
            <SortableContext items={tasks.map(task => task._id)}>
                {tasks.map(task => (
                    <TaskCard key={task._id} task={task} /> // Pass the entire task object
                ))}
            </SortableContext>
        </div>
    );
};

export default TaskColumn;