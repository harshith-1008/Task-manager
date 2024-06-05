import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar(props: any) {
  const navigate = useNavigate();
  async function logout() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );

      console.log(response);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav
      className={`flex items-center py-6 px-1 justify-between font-sans fixed top-0 left-0 right-0 z-50 md:ml-[12.00010rem] border-b-[0.0063rem] border-gray-400  ${
        props.mode ? " bg-[#2C2C38]" : "bg-white"
      }`}
    >
      <div className="flex flex-row items-center">
        <div className="flex item-center justify-center px-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-8 h-8 ${
              props.mode ? "text-white" : "text-black"
            } md:hidden`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <div className="flex">
          <h1
            className={` ${
              props.mode ? " text-white" : "text-black"
            } text-xl pr-2`}
          >
            Task Manager
          </h1>
        </div>
        <button
          className="flex hover:text-white mr-4 md:hidden"
          onClick={props.hideSideMobile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="pt-1 text-[#675EC9] w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center">
        <button
          className="flex text-white bg-[#665DC8] h-7 w-12 rounded-xl items-center justify-center px-3 hover:bg-white hover:text-[#665DC8]"
          onClick={props.addTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className=" w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <div
          className="flex flex-row bg-[#2121D] mx-4"
          onClick={props.changemode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentcolor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4 ${props.mode ? "text-white" : "text-black"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </div>
        <div onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-[#818A9E] w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
