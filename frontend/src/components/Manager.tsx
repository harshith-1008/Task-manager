import { useEffect, useState } from "react";

interface Task {
  title: string;
  description: string;
  status: string;
  // Add any other properties your tasks have
}

export default function Manager(props: any) {
  const [Todo, setTodo] = useState<Task[]>([]);
  const [Doing, setDoing] = useState<Task[]>([]);
  const [Done, setDone] = useState<Task[]>([]);

  useEffect(() => {
    if (props.data && props.data.tasks) {
      const todo: Task[] = [];
      const doing: Task[] = [];
      const done: Task[] = [];

      props.data.tasks.forEach((task: Task) => {
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
    }
  }, [props.data, props.data.tasks]);

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
          {Todo.map((tasks, id) => (
            <div
              key={id}
              className={` h-24 w-[16rem] rounded-xl drop-shadow-2xl shadow-blue py-6 px-3 flex flex-row justify-between ${
                props.mode ? "bg-[#2C2C38]" : "bg-white"
              }`}
            >
              <div className="flex flex-col">
                <h3
                  className={`text-md ${
                    props.mode ? "text-white" : "text-black"
                  }`}
                >
                  {tasks.title}
                </h3>
                <p className="text-[#737C8D] text-sm">{tasks.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 hover:-translate-y-1 duration-300 ${
                  props.mode ? "text-white" : ""
                }`}
                onClick={() => {
                  props.deleteTask(id);
                  props.forcerender();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
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
          {Doing.map((tasks, id) => (
            <div
              key={id}
              className={` h-24 w-[16rem] rounded-xl drop-shadow-2xl shadow-blue py-6 px-3 flex flex-row justify-between ${
                props.mode ? "bg-[#2C2C38]" : "bg-white"
              }`}
            >
              <div className="flex flex-col">
                <h3
                  className={`text-md ${
                    props.mode ? "text-white" : "text-black"
                  }`}
                >
                  {tasks.title}
                </h3>
                <p className="text-[#737C8D] text-sm">{tasks.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 hover:-translate-y-1 duration-300 ${
                  props.mode ? "text-white" : ""
                }`}
                onClick={() => props.deleteTask(id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
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
          {Done.map((tasks, id) => (
            <div
              key={id}
              className={` h-24 w-[16rem] rounded-xl drop-shadow-2xl shadow-blue py-6 px-3 flex flex-row justify-between ${
                props.mode ? "bg-[#2C2C38]" : "bg-white"
              }`}
            >
              <div className="flex flex-col">
                <h3
                  className={`text-md ${
                    props.mode ? "text-white" : "text-black"
                  }`}
                >
                  {tasks.title}
                </h3>
                <p className="text-[#737C8D] text-sm">{tasks.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 hover:-translate-y-1 duration-300 ${
                  props.mode ? "text-white" : ""
                }`}
                onClick={() => props.deleteTask(id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
