import React, { useEffect, useState } from "react";
import { getFollowers } from "../scripts/Follow/follower.ts";
import { getProfile } from "../scripts/Profile/getProfile.tsx";
import { getFollowing } from "../scripts/Follow/following.ts";
import { follow } from "../scripts/Follow/follow.ts";

const Followers = () => {
  const [userfollowers, setUserFollowers] = useState();
  const [zeroFollower, setZeroFollowers] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const { profiles } = await getProfile();
      // console.log(profiles);

      const profileId = profiles.items[0].id;
      console.log("followers", profileId);

      const { followers } = await getFollowers(profileId);
      const { following } = await getFollowing();

      const userFollowers = followers.items;
      const userFollowing = following.items;

      console.log("folloers", userFollowers);
      console.log("followers", userFollowing);

      const onlyfollowers = userFollowers.filter((value1) => {
        return !userFollowing.find((value2) => {
          return value1.wallet.address === value2.profile.ownedBy;
        });
      });

      console.log(onlyfollowers);
      if (!onlyfollowers[0]) setZeroFollowers(true);
      else setUserFollowers(onlyfollowers);

      setFetched(true);
    })();
  }, []);

  return (
    <div className="bg-gradient-to-r m-10 from-[#fd297b] via-[#ff5864] to-[#ff655b]">
      <div className="grid grid-cols-3 justify-center m-5  text-xl text-white ">
        {!fetched ? (
          <p className="mt-36">Fethcing........</p>
        ) : zeroFollower ? (
          <div>Sorry! you got no new like</div>
        ) : (
          userfollowers.map((follower) => (
            <div
              key={follower.wallet.defaultProfile.id}
              className="card w-1/2 bg-white border-white border rounded-full shadow-xl items-center "
            >
              {/* <div class="card-body flex flex-row justify-between"> */}
              <div className="flex items-center flex-col">
                <h2 class="card-title text-black text-base ">
                  {" "}
                  {follower.wallet.defaultProfile.handle}
                </h2>
                <p className="justify-item-end text-black text-base">
                  {follower.wallet.defaultProfile.id}
                </p>
              </div>

              <button
                onClick={async () => {
                  await follow(follower.wallet.defaultProfile.id);
                }}
                class="btn btn-primary w-[9/10] m-2 hover:bg-red-300 text-black  badge badge-outline border border-slate-300 hover:border-red-400 text-xs"
              >
                Follow Back
              </button>

              {/* </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Followers;
