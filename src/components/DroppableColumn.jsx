import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const DroppableColumn = ({ category, tasks, onDelete }) => {
    const { setNodeRef, isOver } = useDroppable({ id: category });

    // Sort tasks based on the 'order' field
    const sortedTasks = tasks.sort((a, b) => a.order - b.order);

    return (
        <div 
            ref={setNodeRef} 
            className={`bg-gray-200 p-4 text-center shadow-lg min-h-[400px] w-full border-2 
                ${isOver ? "border-blue-500" : "border-transparent"}`} 
        >
            <h2 className="text-xl font-bold mb-4">{category}</h2>

            <SortableContext items={sortedTasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col text-left gap-2">
                    {sortedTasks.length > 0 ? (
                        sortedTasks.map((task) => (
                            <SortableItem key={task._id} task={task} onDelete={onDelete} />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Drag tasks here</p>
                    )}
                </div>
            </SortableContext>
        </div>
    );
};

export default DroppableColumn;