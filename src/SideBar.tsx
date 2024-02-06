export default function SideBar(props) {
  return (
    <section
      className={`hidden md:flex md:flex-col md:h-full md:w-[12rem] fixed top-0 left-0 z-40 border-r-[0.0063rem] border-gray-400 ${
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
        <div className="flex flex-col text-[#5D6373] font-bold">
          <h3 className="uppercase mb-3 ml-5 text-sm">
            ALL boards ({props.data.length})
          </h3>
          <div className="flex flex-col space-y-1">
            {props.data.map((name, id) => (
              <div
                className="flex flex-row items-center px-5 h-10 hover:text-white hover:rounded-r-[10rem] hover:bg-[#645FC6]"
                key={id}
              >
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
                <p>{name.name}</p>
              </div>
            ))}

            <div
              className="flex flex-row items-center px-5 h-10 text-[#645FC6] hover:-translate-y-1 hover:scale-110  duration-300"
              onClick={props.addNewBoard}
            >
              <p className="text-sm">+ Create new board</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
