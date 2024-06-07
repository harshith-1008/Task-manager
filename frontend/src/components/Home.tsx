import Manager from "./Manager.tsx";
import Navbar from "./Navbar.tsx";
import SideBar from "./SideBar.tsx";
import AddTask from "./AddTask.tsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [isDark, setIsDark] = useState(true);
  const [addNewTask, setAddNewTask] = useState(false);
  const [showSideMobile, setShowSideMobile] = useState(false);
  const [activeBoard, setActiveBoard] = useState("");
  const [isDashboard, setIsDashboard] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [boardNames, setBoardNames] = useState([]);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsDashboard(location.pathname === "/dashboard");
  }, [location]);

  const changeMode = () => {
    setIsDark((prev) => !prev);
  };

  const showAddNew = () => {
    setAddNewTask((prev) => !prev);
  };

  const changeActiveBoard = (name: string) => {
    setActiveBoard(name);
  };

  const hideSideMobile = () => {
    setShowSideMobile((prev) => !prev);
  };

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/get-user-stats`, {
          withCredentials: true,
        });
        setUserStats(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserStats();
  }, [isDashboard]);

  const createBoard = async (boardName: string) => {
    try {
      await axios.post(
        `${apiUrl}/board/create-board`,
        { boardName },
        { withCredentials: true }
      );

      getBoardNames();
    } catch (err) {
      console.log(err);
    }
  };

  const getBoardNames = async () => {
    try {
      console.log("this is called");
      const response = await axios.get(`${apiUrl}/board/get-board-names`, {
        withCredentials: true,
      });
      console.log(response.data.data);
      setBoardNames(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBoardNames();
  }, []);

  const deleteBoard = async (boardName: string) => {
    try {
      await axios.post(
        `${apiUrl}/board/delete-board`,
        { boardName },
        { withCredentials: true }
      );

      getBoardNames();
    } catch (err) {
      console.log(err);
    }
  };

  const getBoardTasks = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/board/${activeBoard}/tasks/get-board-tasks`,
        { withCredentials: true }
      );

      setTasks(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBoardTasks();
  }, [activeBoard]);

  const addTask = async (
    title: string,
    description: string,
    status: string
  ) => {
    try {
      await axios.post(
        `${apiUrl}/board/${activeBoard}/tasks/add-task`,
        {
          title,
          description,
          status,
        },
        { withCredentials: true }
      );
      getBoardTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        ` ${apiUrl}/board/${activeBoard}/tasks/${taskId}/delete-task`,
        { withCredentials: true }
      );

      getBoardTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const modifyTask = async (status: string, taskId: string) => {
    try {
      await axios.post(
        ` ${apiUrl}/board/${activeBoard}/tasks/${taskId}/modify-task`,
        { status },
        { withCredentials: true }
      );

      getBoardTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row">
      <section>
        <div className={`${showSideMobile ? "flex" : "hidden"} md:flex`}>
          <SideBar
            mode={isDark}
            createBoard={createBoard}
            changeActiveBoard={changeActiveBoard}
            activeBoard={activeBoard}
            deleteBoard={deleteBoard}
            showSideMobile={showSideMobile}
            hideSideMobile={hideSideMobile}
            boardNames={boardNames}
          />
        </div>
      </section>
      <section className="flex flex-col">
        <div className="">
          <Navbar
            isDashboard={isDashboard}
            mode={isDark}
            changemode={changeMode}
            addTask={showAddNew}
            showSideMobile={showSideMobile}
            hideSideMobile={hideSideMobile}
          />
        </div>
        <div className="overflow-x-scroll scrollbar-hidden relative">
          <Manager
            mode={isDark}
            isDashboard={isDashboard}
            userStats={userStats}
            deleteTask={deleteTask}
            modifyTask={modifyTask}
            data={{ tasks }}
            forcerender={getBoardTasks}
          />
          <AddTask
            showAddNew={addNewTask}
            mode={isDark}
            addTask={showAddNew}
            addNewData={addTask}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
