import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  function changeUsernameOrEmailField(e: any) {
    setUsername(e.target.value);
  }
  function changePassword(e: any) {
    setPassword(e.target.value);
  }

  async function validate() {
    if (username === "" || password === "") {
      setErrorMessage("All credentials must be entered");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${apiUrl}/user/login`,
        {
          username: username,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      setLoading(false);
      setUsername("");
      setPassword("");

      if (response.status === 200) {
        navigate("/home");
      }
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 400) {
          setErrorMessage("User doesnt exists");
        } else if (err.response.status === 401) {
          setErrorMessage("Wrong credentials");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    }
  }

  return (
    <section className="flex items-center justify-center border border-white border-solid  h-screen ">
      <div className="flex flex-col items-center justify-center drop-shadow-2xl w-5/6 h-3/6 space-y-3 rounded-xl  md:px-[6rem] md:py-[6rem] md:rounded-3xl md:mt-14  md:space-y-4  border-solid border-2">
        <h1 className="text-bold text-black text-3xl mb-[2rem]">Login</h1>
        <div>
          <input
            type="text"
            className=" border border-solid rounded-[0.5rem] text-black border-slate-200 pl-[0.5rem] h-[2.5rem] w-[20rem]"
            value={username}
            placeholder="username or email"
            onChange={changeUsernameOrEmailField}
          />
        </div>

        <div>
          <input
            type="text"
            className="border border-solid rounded-[0.5rem] text-black border-slate-200  pl-[0.5rem] h-[2.5rem] w-[20rem]"
            value={password}
            placeholder="password"
            onChange={changePassword}
          />
        </div>
        {errorMessage != "" && (
          <div className=" bg-red-200 w-[20rem] rounded-md items-center flex justify-center">
            <p>{errorMessage}</p>
          </div>
        )}
        {loading && <div className="text-black">Loading...</div>}
        <div className="flex flex-row  space-x-1 ml-[-5rem]">
          <p>dont have an account?</p>
          <Link to="/register">
            <p className=" text-blue-600">click here</p>
          </Link>
        </div>
        <div>
          <button
            className="bg-[#665DC8] mt-[2rem] py-2 px-[5rem] rounded-[1rem] hover:bg-black text-white hover:border-white hover:border "
            onClick={validate}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </div>
      </div>
    </section>
  );
}
