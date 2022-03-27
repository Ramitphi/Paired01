import React, { useState } from "react";
import { createProfile } from "../scripts/Profile/createprofile.ts";
import { getFollowing } from "../scripts/Follow/following.ts";
import { getFollowers } from "../scripts/Follow/follower.ts";
import { getProfile } from "../scripts/Profile/getProfile.tsx";
import { follow } from "../scripts/Follow/follow.ts";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [handle, setHandle] = useState("");
  const [fetching, setFetching] = useState(false);
  const [created, setCreated] = useState(false);

  return (
    <div className="flex justify-self-center  h-full justify-center  bg-gradient-to-r from-[#fd297b] via-[#ff5864] to-[#ff655b] ">
      <div>
        <div>
          <div className="m-20">
            <label className="text-white text-2xl">
              Enter your handle name
            </label>
            <input
              type="text"
              className="m-2 border-2 rounded-lg h-10 w-8/10  border-red-400 hover:border-red-700 text-black "
              onChange={(e) => setHandle(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex w-full  justify-center">
          {fetching && (
            // <p className="text-white text-2xl  justify-self-center">
            //   {" "}
            //   Creating........
            // </p>
            <button class="btn loading bg-white text-black">
              Creating.....
            </button>
          )}
        </div>
        <button
          onClick={async () => {
            setFetching(true);

            const res = await createProfile(handle);

            setCreated(true);

            setFetching(false);
          }}
          className="hover:text-white hover:bg-red-300 text-black bg-white  border-2 border-gray-500pa rounded-lg p-2 m-5  w-full"
        >
          Create Profile
        </button>

        {created && (
          <p className="text-white text-xl ml-28 ">
            Profile Created , Please Logout , Refresh & Login again
          </p>
        )}

        {/* <button
          onClick={() => follow("0x02f1")}
          className="bg-black text-white border-2 rounded-lg p-2 m-5  w-full"
        >
          Follow
        </button>
        <button
          onClick={() => getFollowers("0x01a0")}
          className="bg-black text-white border-2 rounded-lg p-2 m-5  w-full"
        >
          Follower
        </button>
        <button
          onClick={() => getProfile({ profileIds: ["0x82"] })}
          className="bg-black text-white border-2 rounded-lg p-2 m-5  w-full"
        >
          Get profile
        </button> */}
      </div>
    </div>
  );
};

export default CreateProfile;
