// import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";

const TaskFrontend = () => {
  const [_id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);

  const port = 7000;

  useEffect(() => {
    (async () => await Load())(); // Immediate Invoke Function
  }, []);

  async function Load() {
    const result = await axios.get(`http://localhost:${port}/tasks`);
    setTasks(result.data);
    console.log(result);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:${port}/task/create`, {
        title: title,
        description: description,
        duedate: duedate,
        status: status,
      });
      alert("Task Registration Successfully");
      setID("");
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      Load();
    } catch (error) {
      alert("User Registration Failed");
    }
  }

  async function editTasks(tasks) {
    setTitle(tasks.title);
    setDescription(tasks.description);
    setDueDate(tasks.duedate);
    setStatus(tasks.status);
    setID(tasks.id);
  }

  async function DeleteEmployee(_id) {
    await axios.delete(`http://localhost:${port}/task/${_id}`);
    alert("Task Deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(`http://localhost:${port}/task/${_id}`, {
        _id: _id,
        title: title,
        description: description,
        duedate: duedate,
        status: status,
      });
      alert("Task Updated Successfully");
      setID("");
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      Load();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl ">
      <div className="flex justify-between items-center w-full space-x-12">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Task System
        </h1>
      </div>

      <div className="flex justify-between items-center w-full space-x-12">
        <input
          type="text"
          className="w-1/2 border-2 border-zinc-800 py-2 pl-2 "
          placeholder="Task Title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>

        <input
          type="text"
          className="w-1/2 border-2 border-zinc-800 py-2 pl-2 "
          placeholder="Task Description"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></input>
      </div>

      <div className="flex justify-between items-center w-full space-x-12">
        <input
          type="date"
          className="w-1/2 border-2 border-zinc-800 py-2 pl-2"
          placeholder="Due Date"
          id="duedate"
          value={duedate}
          onChange={(event) => setDueDate(event.target.value)}
        ></input>

        <select
          className="w-1/2 border-2 border-zinc-800 py-2 pl-2"
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="select">Select</option>
          <option value="1">Completed</option>
          <option value="2">Not Completed</option>
        </select>
      </div>

      <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl ">
        <div className="flex justify-end items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={save}
          >
            Save
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={update}
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {tasks.map((task) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {task.duedate}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {task.status === "1" ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Completed
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Not Completed
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <button
                        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => editTasks(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => DeleteEmployee(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskFrontend;
