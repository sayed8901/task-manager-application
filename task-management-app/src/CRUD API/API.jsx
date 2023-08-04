import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";



// save a new task data
export const addTask = async (newTaskData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/add-task`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newTaskData),
  });
  const data = await response.json();
  return data;
};



// to get all tasks for an individual use
const useTasks = () => {
  const { user } = useContext(AuthContext);

  const { data: allTasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks?email=${user?.email}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
  return [allTasks, refetch];
};
export default useTasks;



// to get a single taskData by its ID
export const useGetSingleTask = (id) => {

  const { data: singleTask = [], refetch } = useQuery({
    queryKey: ["singleTask"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
  return [singleTask, refetch];
};



// update info of a single task by ID
export const updateTaskInfo = (taskData) => {
  fetch(`${import.meta.env.VITE_API_URL}/updateTask/${taskData?.updateProcessID}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(taskData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};