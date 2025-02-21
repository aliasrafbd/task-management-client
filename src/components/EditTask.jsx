import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";

const categories = ["To-Do", "In Progress", "Done"];

const EditTask = ({ task, onClose, refreshTasks }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: task
    });

    const axiosPublic = useAxiosPublic();

    // ✅ Ensure form resets when task changes
    useEffect(() => {
        reset(task);
    }, [task, reset]);

    const onSubmit = async (data) => {
        try {
            await axiosPublic.put(`/tasksdetails/${task._id}`, {
                title: data.title,
                description: data.description || "",
                category: data.category,
            });

            refreshTasks(); // Refresh task list
            onClose(); // Close modal after submission
            console.log("✅ Task updated successfully");
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    return (
        <div 
            className="bg-white shadow-md p-4 rounded-md mb-4"
            onPointerDownCapture={(event) => event.stopPropagation()} // 🛑 Stops drag events inside modal
        >
            <h2 className="text-lg font-semibold mb-2">Edit Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium">Title:</label>
                    <input
                        {...register("title", { required: "Title is required", maxLength: 50 })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter task title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium">Description:</label>
                    <textarea
                        {...register("description", { maxLength: 200 })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter task description"
                    />
                    {errors.description && <p className="text-red-500 text-sm">Max 200 characters</p>}
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium">Category:</label>
                    <select {...register("category", { required: true })} className="w-full p-2 border rounded">
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default EditTask;