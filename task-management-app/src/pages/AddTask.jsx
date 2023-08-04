import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Fade, Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";

const AddTask = () => {
    const { user } = useContext(AuthContext);
  // console.log(user);
    
  return (
    <div className="min-h-screen" name="addTask">
      <form
        // onSubmit={handleAdd}
        className="card-body w-full sm:max-w-[90%] mx-auto"
      >
        <Fade className="text-3xl font-bold text-center text-gradient mb-4">
          Add a New Class
        </Fade>
        <Slide cascade>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input
              type="text"
              name="className"
              placeholder="Name of the class you want to add."
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Class Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="input input-bordered pt-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available Seats</span>
              </label>
              <input
                type="number"
                name="availableSeats"
                placeholder="Number of seats open"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Price of the course"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Name</span>
            </label>
            <input
              type="text"
              readOnly
              defaultValue={user.displayName}
              name="instructorName"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Email</span>
            </label>
            <input
              type="email"
              readOnly
              defaultValue={user.email}
              name="instructorEmail"
              className="input input-bordered"
            />
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
