import { useState } from "react";

export default function SideBar(props: any) {
  const [newBoardName, setNewBoardName] = useState("");

  function callCreateBoard() {
    props.createBoard(newBoardName);
    setNewBoardName("");
  }
  return (
    <section
      className={`${
        props.showSideMobile ? "flex h-auto w-[15rem]" : "hidden"
      } md:flex md:flex-col md:h-full md:w-[12rem] fixed top-0 left-0 md:left-0 z-40 md:border-r-[0.0063rem] md:border-gray-400 ${
        props.mode ? "bg-[#2C2C38]" : "bg-white"
      }`}
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-row items-center mb-7 px-4 py-6 justify-center">
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-8 h-8 ${props.mode ? "text-white" : "text-black"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h2
            className={` text-lg mr-2  ${
              props.mode ? " text-white" : "  text-black"
            }`}
          >
            Notes App
          </h2>
        </div>
        <div
          className={`flex flex-col  font-bold  ${
            props.mode ? "text-white" : "text-[#5d6373]"
          }`}
        >
          <h3 className="uppercase mb-3 ml-5 text-sm font-light">
            ALL boards (
            {Array.isArray(props.boardNames) ? props.boardNames.length : 0})
          </h3>
          <div className="flex flex-col space-y-1">
            {props.boardNames.map(
              (board: { _id: string; boardName: string }, id: number) => (
                <div
                  className={`group flex flex-row items-center justify-between px-5 h-10 ${
                    props.activeBoard === board._id
                      ? "bg-[#6454c6] rounded-r-[10rem] text-white"
                      : ""
                  }`}
                  key={id}
                  onClick={() => {
                    props.changeActiveBoard(board._id), props.hideSideMobile();
                  }}
                >
                  <div className="flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <p>{board.boardName}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 hidden group-hover:block hover:-translate-y-1 hover:scale-100 duration-300"
                    onClick={() => props.deleteBoard(board._id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              )
            )}
            <div className=" ml-5 mr-5 items-center flex flex-col">
              <input
                type="text"
                className={`w-36 border-[0.0063rem] border-gray-500 rounded-lg h-8 p-2 text-xs font-normal mt-2 ${
                  props.mode ? "bg-[#2C2C38]" : "bg-slate-100"
                }`}
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              ></input>
              <div className="flex flex-row items-center text-[#645FC6] mb-4">
                <button className="text-sm" onClick={callCreateBoard}>
                  Create new board
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
