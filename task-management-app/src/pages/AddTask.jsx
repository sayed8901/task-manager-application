import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Fade, Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";
import { addTask } from "../CRUD API/API";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const handleAdd = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;
    const priority = form.priority.value;
    const userName = user.displayName;
    const userEmail = user.email;

    const newTaskData = {
      title, description, status, priority, userName, userEmail
    }
    console.log(newTaskData);

    // to save task data to the database
    addTask(newTaskData);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have successfully added a new task.",
      showConfirmButton: false,
      timer: 1500,
    });

    form.reset();
  }

  return (
    <div className="hero min-h-screen container mx-auto" name="addTask">
      <form
        onSubmit={handleAdd}
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
              placeholder="Description of the tasks"
              className="textarea textarea-bordered textarea-lg"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={user.displayName}
                name="userName"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                readOnly
                defaultValue={user.email}
                name="instructorEmail"
                className="input input-bordered"
              />
            </div>
          </div>
        </Slide>

        <input
          className="btn btn-primary w-36 mx-auto mt-6 bg-gradient font-bold"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AddTask;
