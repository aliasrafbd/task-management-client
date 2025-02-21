import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoardSample = () => {
    const [tasks, setTasks] = useState([]);

    // Categories for tasks
    const categories = ["To-Do", "In Progress", "Done"];

    // Sample task data
    useEffect(() => {
        const initialTasks = [
            { id: "1", title: "Task 1", description: "Description for Task 1", category: "To-Do" },
            { id: "2", title: "Task 2", description: "Description for Task 2", category: "In Progress" },
            { id: "3", title: "Task 3", description: "Description for Task 3", category: "Done" },
        ];
        setTasks(initialTasks);
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);

        movedTask.category = categories[result.destination.droppableId];
        updatedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-3 gap-4 p-4">
                {categories.map((category, index) => (
                    <Droppable key={category} droppableId={index.toString()}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-gray-100 p-4 rounded shadow-lg min-h-[400px]"
                            >
                                <h2 className="text-xl font-bold mb-4">{category}</h2>
                                <div className="flex flex-col gap-2">
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .map((task, taskIndex) => (
                                            <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white p-3 rounded shadow mb-2"
                                                    >
                                                        <h3 className="font-semibold">{task.title}</h3>
                                                        <p className="text-sm text-gray-600">{task.description}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoardSample;
