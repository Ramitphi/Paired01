import React from "react";
import { login } from "../scripts/login-user";
import { StaggerTextReveal } from "stagger-text-reveal-animation";
import { getProfile } from "../scripts/Profile/getProfile.tsx";
import { useNavigate } from "react-router-dom";

const LoginUser = ({ userLogin, setUserLogin, setHasProfile }) => {
  // const navigate = useNavigate();
  const loginUser = async () => {
    const res = await login();
    if (res) {
      setUserLogin(true);
    }

    const profile = await getProfile();
    console.log(profile);
    console.log(profile.profiles.items[0]);
    if (profile.profiles.items[0]) {
      setHasProfile(true);
      // navigate.push("/profile");
    } else {
      alert("You dont have any Profile on Lens , Please create one");
      // navigate.push("/create");
    }
  };
  return (
    <div className="flex flex-col  justify-center h-screen items-center bg-gradient-to-r from-[#fd297b] via-[#ff5864] to-[#ff655b]">
      <p className="text-6xl font-semibold text-white ">
        <StaggerTextReveal text={"Pair. Huddle. Vibe"} />
      </p>
      <button
        onClick={async () => await loginUser()}
        className="text-white border-2  mt-8 w-1/4 p-2 rounded-lg"
      >
        Login
      </button>
    </div>
  );
};

export default LoginUser;
