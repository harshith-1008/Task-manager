import { useState } from "react";
import "./App.css";
import Manager from "./Manager";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import AddTask from "./AddTask";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [addNewTask, setAddNewTask] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      name: "board1",
      tasks: {
        title: "make coffee",
        description: "buy coffee powder and make coffee",
        status: "todo",
      },
    },
    {
      id: 2,
      name: "board2",
      tasks: {
        title: "Do homework",
        description: "do maths homework",
        status: "done",
      },
    },
    {
      id: 3,
      name: "board3",
      tasks: {
        title: "complete mid prep",
        description: "learn all the topics from syllabus",
        status: "doing",
      },
    },
  ]);

  const changeMode = () => {
    setIsDark((prev) => !prev);
  };

  const showAddNew = () => {
    setAddNewTask((prev) => !prev);
  };

  const addNewBoard = () => {
    console.log("new board created");
  };

  return (
    <div className="flex flex-row">
      <section>
        <div className="hidden md:flex">
          <SideBar mode={isDark} data={data} addNewBoard={addNewBoard} />
        </div>
      </section>
      <section className="flex flex-col">
        <div className="">
          <Navbar mode={isDark} changemode={changeMode} addTask={showAddNew} />
        </div>
        <div className="overflow-x-scroll scrollbar-hidden relative">
          <Manager mode={isDark} data={data} />
          <AddTask showAddNew={addNewTask} mode={isDark} addTask={showAddNew} />
        </div>
      </section>
    </div>
  );
}

export default App;
