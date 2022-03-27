import React, { useEffect, useState } from "react";
import { recommendedProfile } from "../scripts/Profile/recommended-profiles.ts";

const Recommondations = () => {
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    (async () => {
      const data = await recommendedProfile();
      console.log(data);
    })();
  });

  return (
    <div>
      <div className="card w-96  shadow-xl text-white m-2 bg-[rgb(24,24,27)]">
        <figure className="m-2">
          {/* <img src={profile.image} alt="Profile image" /> */}
        </figure>
        <div class="card-body h-1/4 w-[1/10]">
          <h2 class="card-title"> Handle :</h2>
          <p className="justify-item-end">Profile ID</p>
          <div class="card-actions justify-between">
            <button class="btn btn-primary bg-green-400">Like</button>
            <button class="btn btn-primary bg-red-300">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommondations;
