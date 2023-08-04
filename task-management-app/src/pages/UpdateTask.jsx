import { Fade, Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useTasks, { updateTaskInfo, useGetSingleTask } from "../CRUD API/API";

const UpdateTask = () => {
  const [, refetch] = useTasks();
  const { id } = useParams();
  const [singleTask] = useGetSingleTask(id);
  //   console.log(id, singleTask);
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;
    const priority = form.priority.value;

    const UpdatedTaskData = {
      updateProcessID: id,
      title,
      description,
      status,
      priority,
    };
    console.log(UpdatedTaskData);

    // to update the task data to the database
    updateTaskInfo(UpdatedTaskData);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have successfully added a new task.",
      showConfirmButton: false,
      timer: 1500,
    });

    form.reset();

    refetch();

    navigate("/");
  };

  return (
    <div className="hero min-h-screen container mx-auto" name="addTask">
      <form
        onSubmit={handleUpdate}
        className="card-body w-full sm:max-w-[90%] mx-auto"
      >
        <Fade className="text-3xl font-bold text-center text-gradient mb-2 sm:mb-4">
          Update Task Data
        </Fade>
        <Slide cascade>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={singleTask.title}
              className="input input-bordered"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <div className="input-group">
                <select
                  className="select select-bordered w-full"
                  name="status"
                  required
                >
                  <option>TO DO</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <div className="input-group">
                <select
                  className="select select-bordered w-full"
                  name="priority"
                  required
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              name="description"
              defaultValue={singleTask.description}
              className="textarea textarea-bordered textarea-lg"
              required
            ></textarea>
          </div>
        </Slide>

        <input
          className="btn btn-primary w-36 mx-auto mt-6 bg-gradient font-bold"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default UpdateTask;
