import { useState } from "react";
import "./App.css";
import Manager from "./Manager";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import AddTask from "./AddTask";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [addNewTask, setAddNewTask] = useState(false);
  const [activeBoard, setActiveBoard] = useState(0);
  const [data, setData] = useState([
    {
      name: "board 1",
      tasks: [{}],
    },
  ]);

  const changeMode = () => {
    setIsDark((prev) => !prev);
  };

  const showAddNew = () => {
    setAddNewTask((prev) => !prev);
  };

  const addNewBoard = (title) => {
    setData((prevData) => {
      if (title === "") {
        const newData = prevData.concat({
          name: "Board " + (data.length + 1),
          tasks: [],
        });
        return newData;
      } else {
        const newData = prevData.concat({ name: title, tasks: [] });
        return newData;
      }
    });
  };

  const AddToData = (title, description, status) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[activeBoard].tasks = newData[activeBoard].tasks.concat({
        title: title,
        description: description,
        status: status,
      });
      return newData;
    });
  };

  const changeActiveBoard = (index) => {
    setActiveBoard(index);
  };
  console.log(data);
  return (
    <div className="flex flex-row">
      <section>
        <div className="hidden md:flex">
          <SideBar
            mode={isDark}
            data={data}
            addNewBoard={addNewBoard}
            changeActiveBoard={changeActiveBoard}
            activeBoard={activeBoard}
          />
        </div>
      </section>
      <section className="flex flex-col">
        <div className="">
          <Navbar mode={isDark} changemode={changeMode} addTask={showAddNew} />
        </div>
        <div className="overflow-x-scroll scrollbar-hidden relative">
          <Manager mode={isDark} data={data[activeBoard]} />
          <AddTask
            showAddNew={addNewTask}
            mode={isDark}
            addTask={showAddNew}
            addToData={AddToData}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
