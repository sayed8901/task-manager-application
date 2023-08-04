import { useContext } from "react";
import "./App.css";
import Banner from "./pages/Banner";
import { AuthContext } from "./AuthProvider/AuthProvider";
import AddTask from "./pages/AddTask";
import AllTasks from "./pages/AllTasks";

function App() {
  const { user } = useContext(AuthContext);
  // console.log(user);

  return (
    <div>
      <Banner />
      {user && (
        <>
          <AddTask />
          <AllTasks />
        </>
      )}
    </div>
  );
}

export default App;
