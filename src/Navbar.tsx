import icon from "./assets/icon.png"

export default function Navbar(){

    function show(){
        console.log("clicked");
    }

    return(
        <nav className="bg-[#2C2C38] flex items-center py-6 px-1 justify-between font-sans fixed top-0 left-0 right-0 z-50 md:ml-[12.00010rem]">
            <div className="flex flex-row items-center">
                <div className="flex item-center justify-center px-1">
                    <img src={icon} className="size-8 md:hidden"/>
                </div>
                <div className="flex">
                    <h1 className="text-white text-xl pr-2">Task Manager</h1>
                </div>
                <button className="flex hover:text-white">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="pt-1 text-[#675EC9] w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center">
                <button className="flex bg-[#665DC8] h-7 w-12 rounded-xl items-center justify-center px-3 hover:bg-white hover:text-[#665DC8]" onClick={show}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="text-white w-4 h-4 hover:text-[#665DC8]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <div>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#818A9E] w-6 h-6">
                        <path 
                            strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </div>
            </div>
        </nav>
    )
}
