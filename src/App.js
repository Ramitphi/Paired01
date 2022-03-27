import "./App.css";

import LoginUser from "./components/LoginUser";
import CreateProfile from "./components/CreateProfile";
import GetProfile from "./components/GetProfile";
import ShowProfiles from "./components/ShowProfile";
// import Followers from "./components/Followers";
import Matches from "./components/Matches";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  return (
    <div className=" items-center h-screen overflow-auto   bg-gradient-to-r from-[#fd297b] via-[#ff5864] to-[#ff655b] w-screen justify-center ">
      {!userLogin ? (
        <div className="h-full">
          <LoginUser
            userLogin={userLogin}
            setUserLogin={setUserLogin}
            setHasProfile={setHasProfile}
          />
        </div>
      ) : (
        <Router>
          <div className="flex sticky top-0 z-10 ml-44  items-center max-w-screen justify-center  ">
            <Link
              to="/create"
              className="btn hover:text-white hover:bg-red-300 text-black bg-white  w-1/5"
            >
              {" "}
              Create Profile{" "}
            </Link>
            <Link
              to="/profile"
              className="btn hover:text-white hover:bg-red-300 text-black bg-white  w-1/5"
            >
              {" "}
              My Profile{" "}
            </Link>

            <Link
              to="/show"
              className="btn hover:text-white hover:bg-red-300 text-black bg-white w-1/5"
            >
              {" "}
              Discovery{" "}
            </Link>

            <Link
              to="/matches"
              className="btn hover:text-white hover:bg-red-300 text-black bg-white w-1/5"
            >
              {" "}
              Matches{" "}
            </Link>
            <Link
              to="/"
              className="btn ml-40 justify-self-end hover:text-white hover:bg-black text-black bg-white w-24"
              onClick={() => {
                setUserLogin(false);
              }}
            >
              Log Out
            </Link>
          </div>
          <Routes>
            <Route path="/create" element={<CreateProfile />} />
            <Route path="/profile" element={<GetProfile />} />
            <Route path="/show" element={<ShowProfiles />} />
            {/* <Route path="/" element={<LoginUser />} /> */}

            <Route path="/matches" element={<Matches />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
