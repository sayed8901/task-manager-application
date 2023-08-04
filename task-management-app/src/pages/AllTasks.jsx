import { Fade } from "react-awesome-reveal";
import useTasks from "../CRUD API/API";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllTasks = () => {
  const [allTasks, refetch] = useTasks();
  console.log(allTasks);

  const handleDelete = (id) => {
    // console.log("Want to delete?", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())

          .then((data) => {
            console.log("Successfully deleted", data);

            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your task data has been removed.",
                "success"
              );
            }

            refetch();
          });
      }
    });
  };

  return (
    <div className="hero min-h-screen container mx-auto" name="allTasks">
      <div className="overflow-x-auto">
        <Fade className="text-3xl font-bold text-center text-gradient mb-4 sm:mb-8">
          All Tasks List
        </Fade>

        <table className="table table-zebra mx-auto">
          {/* table heading */}
          <thead>
            <tr className="text-center font-bold text-base bg-base-200">
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* table rows */}
            {allTasks.map((task, index) => (
              <tr className="hover" key={task._id}>
                <td className="text-center">
                  <div className="font-bold">
                    {index + 1}. {task.title}
                  </div>
                  <div>
                    <span className="text-[10px]">Priority:</span>{" "}
                    <span className="badge badge-ghost badge-sm">
                      {task.priority}
                    </span>
                  </div>
                </td>
                <td className="text-center">{task.description}</td>
                <td
                  className={`text-center ${
                    task.status == "Completed" &&
                    "text-red-400 text-sm md:text-xl font-semibold bg-gradient rounded-2xl"
                  }`}
                >
                  {task.status}
                </td>

                <td className="mx-auto flex justify-center items-center text-center gap-4">
                  <span className="text-blue-500 text-sm sm:text-xl hover:scale-125 duration-300">
                    <Link
                      to={`update-task-data/${task._id}`}
                      className="btn btn-sm btn-primary btn-outline"
                      title="Edit/ Update Task"
                    >
                      <FaRegEdit />
                    </Link>
                  </span>

                  <span
                    onClick={() => {
                      handleDelete(task._id);
                    }}
                    className="text-orange-500 text-sm sm:text-xl hover:scale-150 duration-300"
                    title="Delete Task"
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTasks;
