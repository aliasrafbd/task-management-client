import { useContext, useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import TaskChart from "./TaskChart";
import LoginLogout from "./LoginLogout";

const categories = ["To-Do", "In Progress", "Done"];

const AddTask = ({ refreshTasks }) => {
    const [isOpen, setIsOpen] = useState(false); // State for modal visibility
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const { user, logOut } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            await axiosPublic.post("/tasks", {
                title: data.title,
                description: data.description || "",
                category: data.category,
            });

            reset(); // Clear form after submission
            refreshTasks(); // Refresh task list
            setIsOpen(false); // Close modal after submission
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="pt-12 rounded-md">
            {/* Button to Open Modal */}
            <div className="bg-amber-200 p-4 flex items-center justify-between">
                <div>
                    <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add New Task
                    </button>
                </div>
                <LoginLogout></LoginLogout>
            </div>

            {/* DaisyUI Modal */}
            {isOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Add New Task</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
                            {/* Title Field */}
                            <div>
                                <label className="block text-sm font-medium">Title:</label>
                                <input
                                    {...register("title", { required: "Title is required", maxLength: 50 })}
                                    className="input input-bordered w-full"
                                    placeholder="Enter task title"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            {/* Description Field */}
                            <div>
                                <label className="block text-sm font-medium">Description:</label>
                                <textarea
                                    {...register("description", { maxLength: 200 })}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Enter task description"
                                />
                                {errors.description && <p className="text-red-500 text-sm">Max 200 characters</p>}
                            </div>

                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm font-medium">Category:</label>
                                <select {...register("category", { required: true })} className="select select-bordered w-full">
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="modal-action">
                                <button type="submit" className="btn">Add Task</button>
                                <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AddTask;