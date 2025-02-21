import { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditTask from "./EditTask";
import { AuthContext } from "../providers/AuthProvider";

const SortableItem = ({ task, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { tasksRefetch } = useContext(AuthContext);

    // 🟢 Add useSortable for drag functionality
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
        id: task._id 
    });

    // Apply drag styles
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setTimeout(() => setIsEditModalOpen(true), 100);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        setTimeout(() => onDelete(task._id), 100);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex justify-between items-center p-2 border rounded bg-white cursor-grab"
            {...attributes} // ✅ Drag functionality remains
            {...listeners}  
            onPointerDownCapture={(event) => {
                if (event.target.closest("[data-no-dnd]")) {
                    event.stopPropagation(); // ✅ Prevent dragging when clicking Edit/Delete
                }
            }}
        >
            <div className="flex-1 cursor-pointer" onClick={handleEditClick}>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-500">{task.description}</p>
            </div>
            <div className="flex items-center">
                <button data-no-dnd className="text-blue-500 mr-2" onClick={handleEditClick}>
                    Edit
                </button>
                <button data-no-dnd className="text-red-500" onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>
            {isEditModalOpen && (
                <EditTask 
                    task={task} 
                    onClose={() => setIsEditModalOpen(false)} 
                    refreshTasks={tasksRefetch} 
                />
            )}
        </div>
    );
};

export default SortableItem;