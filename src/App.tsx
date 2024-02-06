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
      tasks: [{}],
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

  const AddToData = (title, description, status) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[0].tasks.push({
        title: title,
        description: description,
        status: status,
      });
      return newData;
    });
  };
  console.log(data);
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
