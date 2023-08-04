import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Fade, Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";
import { addTask } from "../CRUD API/API";
import useTasks from "../CRUD API/API";
import { useForm } from "react-hook-form";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const [, refetch] = useTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    const userName = user.displayName;
    const userEmail = user.email;

    const newTaskData = {
      ...data,
      userName,
      userEmail,
    };

    // console.log(newTaskData);

    // to save task data to the database
    addTask(newTaskData);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have successfully added a new task.",
      showConfirmButton: false,
      timer: 1500,
    });

    reset();

    refetch();
  };

  return (
    <div className="hero min-h-screen container mx-auto my-12" name="addTask">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body w-full sm:max-w-[90%] mx-auto"
      >
        <Fade className="text-3xl font-bold text-center text-gradient mb-2 sm:mb-4">
          Add a New Task
        </Fade>

        <Slide cascade>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title of the task"
              className="input input-bordered"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                name="status"
                className="select select-bordered w-full"
                {...register("status", { required: true })}
              >
                <option>TO DO</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
              {errors.status && (
                <span className="text-red-500">Status is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                name="priority"
                className="select select-bordered w-full"
                {...register("priority", { required: true })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              {errors.priority && (
                <span className="text-red-500">Priority is required</span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Description of the tasks"
              className="textarea textarea-bordered textarea-lg"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>
        </Slide>

        <div className="form-control mt-8 w-1/2 mx-auto">
          <input className="btn btn-primary bg-gradient" type="submit" value="Add Task" />
        </div>
      </form>
    </div>
  );
};

export default AddTask;
