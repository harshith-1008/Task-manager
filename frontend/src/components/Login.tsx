import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function changeUsernameOrEmailField(e: any) {
    console.log(e);
    setUsername(e.target.value);
  }
  function changePassword(e: any) {
    setPassword(e.target.value);
  }

  async function validate() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          username: username,
          password,
        },
        { withCredentials: true }
      );
      setUsername("");
      setPassword("");

      if (response.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="flex items-center justify-center border border-white border-solid bg-black h-screen">
      <div className="flex flex-col items-center justify-center bg-black  px-[6rem] py-[6rem] rounded-3xl  mt-14  space-y-4 border-white border-solid border-2">
        <h1 className="text-bold text-white text-3xl mb-[2rem]">Login</h1>
        <div>
          <input
            type="text"
            className=" border border-solid rounded-[0.5rem] text-white border-slate-200 bg-black pl-[0.5rem] h-[2.5rem] w-[20rem]"
            value={username}
            placeholder="username or email"
            onChange={changeUsernameOrEmailField}
          />
        </div>

        <div>
          <input
            type="text"
            className="border border-solid rounded-[0.5rem] text-white border-slate-200 bg-black pl-[0.5rem] h-[2.5rem] w-[20rem]"
            value={password}
            placeholder="password"
            onChange={changePassword}
          />
        </div>
        <div className="flex flex-row text-white space-x-1 ml-[-5rem]">
          <p>dont have an account?</p>
          <Link to="/register">
            <p className=" text-blue-600">click here</p>
          </Link>
        </div>
        <div>
          <button
            className="bg-white mt-[2rem] py-2 px-[5rem] rounded-[1rem] hover:bg-black hover:text-white hover:border-white hover:border "
            onClick={validate}
          >
            LOGIN
          </button>
        </div>
      </div>
    </section>
  );
}
