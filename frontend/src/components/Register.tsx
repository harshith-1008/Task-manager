import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function changeUsername(e: any) {
    setUsername(e.target.value);
  }
  function changePassword(e: any) {
    setPassword(e.target.value);
  }
  function changeEmail(e: any) {
    setEmail(e.target.value);
  }

  async function registerUser() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          username: username,
          email: email,
          password: password,
        },
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
    <section
      className="flex items-center justify-center border border-white border-solid  bg-[#21212D] h-screen
    "
    >
      <div className="flex flex-col items-center justify-center bg-[#665DC8] px-[4rem] py-[6rem] mt-14  space-y-4 rounded-2xl">
        <h1 className="text-bold text-white text-3xl mb-[1rem]">Register</h1>
        <div>
          <input
            type="text"
            className=" border border-solid rounded-[0.5rem] text-white border-slate-200 bg-[#665DC8] pl-[0.5rem] h-[2.5rem] w-[20rem]"
            placeholder="username"
            onChange={changeUsername}
            value={username}
          />
        </div>
        <div>
          <input
            type="text"
            className=" border border-solid rounded-[0.5rem] text-white border-slate-200 bg-[#665DC8] pl-[0.5rem] h-[2.5rem] w-[20rem]"
            placeholder="email"
            onChange={changeEmail}
            value={email}
          />
        </div>
        <div>
          <input
            type="text"
            className=" border border-solid rounded-[0.5rem] text-white border-slate-200 bg-[#665DC8] pl-[0.5rem] h-[2.5rem] w-[20rem]"
            placeholder="password"
            onChange={changePassword}
            value={password}
          />
        </div>
        <div>
          <button
            className="bg-white mt-[2rem] py-2 px-[5rem] rounded-[1rem] hover:bg-[#665DC8] hover:text-white hover:border-white hover:border "
            onClick={registerUser}
          >
            REGISTER
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
