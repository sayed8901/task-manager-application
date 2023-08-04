import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-scroll";

const Banner = () => {
  const { user, googleSignIn, logOut } = useContext(AuthContext);
  // console.log(user);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">
            {user ? `Hello ${user.displayName}` : `Hello there`}
          </h1>
          <p className="my-10">
            Welcome you to this task management application. Here you can manage your upcoming & to do tasks very easily.
          </p>
          <p className="mb-5">
            {!user &&
              <p className="mt-20">You can add a new task or view your all enlisted tasks by logging in.</p>}
          </p>
          <div className="mb-10">
            {user ? (
              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center items-center gap-2">
                  <p>
                    Welcome back!{" "}
                    <span className="text-2xl font-bold">
                      {user.displayName}
                    </span>
                  </p>
                  <img
                    className="rounded-full w-10"
                    src={user.photoURL}
                    alt="User Image"
                  />
                </div>
                <button onClick={() => logOut()} className="btn btn-primary">
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  googleSignIn();
                }}
                className="btn btn-primary"
              >
                Easy log-in with google
              </button>
            )}
          </div>

          <div className="mt-20">
            {user && (
              <div className="flex justify-center items-center gap-16">
                <Link
                  to="addTask"
                  smooth
                  duration={500}
                  className="btn btn-info w-40"
                >
                  Add a new task
                </Link>
                <Link
                  to="allTasks"
                  smooth
                  duration={500}
                  className="btn btn-info w-40"
                >
                  Show all Tasks
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
