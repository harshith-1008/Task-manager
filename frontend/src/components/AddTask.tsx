import { useState } from "react";

export default function AddTask(props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const sendTask = () => {
    props.addNewData(title, description, status);
    setTitle("");
    setDescription("");
    setStatus("");
  };

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col absolute space-y-3 p-6  text-white rounded-lg inset-28 bottom-[15rem] left-[2rem] right-[2rem] md:left-[34rem] md:right-[34rem] md:bottom-[11rem] ${
        props.showAddNew ? "" : "hidden"
      } ${props.mode ? "bg-[#2c2c38]" : "bg-white"}`}
    >
      <div className="flex flex-row justify-between items-center">
        <h2 className={`mb-2 text-xl ${props.mode ? "" : "text-black"}`}>
          Add New Task
        </h2>
        <div onClick={props.addTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 pb-2 ${
              props.mode ? "text-white" : "text-black"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <div className={`flex flex-col ${props.mode ? "" : "text-black"}`}>
        <label>Title</label>
        <input
          required
          type="text"
          placeholder="e.g Take a coffee break"
          className={`${
            props.mode ? "bg-[#2c2c38]" : "bg-white"
          } border-[0.0063rem] border-[#455451] h-8 rounded-md p-2 text-sm`}
          value={title}
          onChange={handleTitleChange}
        ></input>
      </div>
      <div className={`flex flex-col ${props.mode ? "" : "text-black"}`}>
        <label>Discription</label>
        <textarea
          required
          placeholder="e.g. Its good to take small breaks"
          className={`${
            props.mode ? "bg-[#2c2c38]" : "bg-white"
          } border-[0.0063rem] border-[#455451] h-24 rounded-md p-2 text-sm`}
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div className={`flex flex-col ${props.mode ? "" : "text-black"}`}>
        <p>Status</p>
        <select
          id="dropdown"
          className="bg-transparent border-[0.08rem] border-gray-100 h-8 rounded-md"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="none">None</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="flex bg-[#665DC8] text-white px-2 justify-center items-center rounded-3xl h-10"
        onClick={() => {
          sendTask();
          props.addTask();
        }}
      >
        Create Task
      </button>
    </form>
  );
}
