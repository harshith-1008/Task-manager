import { useState } from "react";
import "./App.css";
import Manager from "./Manager";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import AddTask from "./AddTask";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [addNewTask, setAddNewTask] = useState(false);
  const [showSideMobile, setShowSideMobile] = useState(false);
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

  const addNewBoard = (title: string) => {
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

  const AddToData = (title: string, description: string, status: String) => {
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

  const deleteBoard = (popid: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(popid, 1);
      return newData;
    });
  };

  const changeActiveBoard = (index: number) => {
    setActiveBoard(index);
  };

  const hideSideMobile = () => {
    setShowSideMobile((prev) => !prev);
    console.log(showSideMobile);
  };

  console.log(data);

  return (
    <div className="flex flex-row">
      <section>
        <div className={`${showSideMobile ? "flex" : "hidden"} md:flex`}>
          <SideBar
            mode={isDark}
            data={data}
            addNewBoard={addNewBoard}
            changeActiveBoard={changeActiveBoard}
            activeBoard={activeBoard}
            deleteBoard={deleteBoard}
            showSideMobile={showSideMobile}
            hideSideMobile={hideSideMobile}
          />
        </div>
      </section>
      <section className="flex flex-col">
        <div className="">
          <Navbar
            mode={isDark}
            changemode={changeMode}
            addTask={showAddNew}
            showSideMobile={showSideMobile}
            hideSideMobile={hideSideMobile}
          />
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
