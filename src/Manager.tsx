import { useEffect, useState } from "react";

export default function Manager(props) {
  const [Todo, setTodo] = useState([]);
  const [Doing, setDoing] = useState([]);
  const [Done, setDone] = useState([]);
  useEffect(() => {
    const todo = [];
    const doing = [];
    const done = [];

    props.data.tasks.forEach((task) => {
      switch (task.status) {
        case "todo":
          todo.push(task);
          break;
        case "doing":
          doing.push(task);
          break;
        case "done":
          done.push(task);
          break;
      }
    });

    setTodo(todo);
    setDoing(doing);
    setDone(done);
  }, [props.data.tasks]);

  return (
    <main
      className={`h-screen py-3 px-4 pb-10 flex flex-row space-x-8 w-screen flex-nowrap mt-[5rem] md:mt-[4.75rem] md:ml-[12rem] overflow-x-scroll scrollbar-hidden  ${
        props.mode ? " bg-[#21212D]" : " bg-gray-100"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center mb-3">
          <div className="size-4 rounded-full bg-[#45C6E0] mx-2"></div>
          <div className="text-[#808D9C] text-md">Todo({Todo.length})</div>
        </div>
        <div className="flex flex-col space-y-3 pt-2 mx-2">
          {Todo.map((tasks, index) => (
            <div
              key={index}
              className={` h-24 w-[16rem] rounded-xl drop-shadow-2xl shadow-blue py-6 px-3 ${
                props.mode ? "bg-[#2C2C38]" : "bg-white"
              }`}
            >
              <h3
                className={`text-md ${
                  props.mode ? "text-white" : "text-black"
                }`}
              >
                {tasks.title}
              </h3>
              <p className="text-[#737C8D] text-sm">{tasks.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center  mb-3">
          <div className="size-4 rounded-full bg-[#8471F1] mx-2"></div>
          <div className="text-[#808D9C] text-md">Doing({Doing.length})</div>
        </div>
        <div className="flex flex-col space-y-3 pt-2 mx-2">
          {Doing.map((tasks, index) => (
            <div
              key={index}
              className={` h-24 w-[16rem] rounded-xl drop-shadow-2xl shadow-blue py-6 px-3 ${
                props.mode ? "bg-[#2C2C38]" : "bg-white"
              }`}
            >
              <h3
                className={`text-md ${
                  props.mode ? "text-white" : "text-black"
                }`}
              >
                {tasks.title}
              </h3>
              <p className="text-[#737C8D] text-sm">{tasks.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center  mb-3">
          <div className="size-4 rounded-full bg-[#6ADEAB] mx-2"></div>
          <div className="text-[#808D9C] text-md">Done({Done.length})</div>
        </div>
        <div className="flex flex-col space-y-3 pt-2 mx-2">
          {Done.map((tasks, index) => (
            <div
              key={index}
              className={` h-24 w-[16rem] rounded-xl drop-shadow-2xl shadow-blue py-6 px-3 ${
                props.mode ? "bg-[#2C2C38]" : "bg-white"
              }`}
            >
              <h3
                className={`text-md ${
                  props.mode ? "text-white" : "text-black"
                }`}
              >
                {tasks.title}
              </h3>
              <p className="text-[#737C8D] text-sm">{tasks.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
