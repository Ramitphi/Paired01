import React, { useEffect, useState } from "react";
import { getFollowers } from "../scripts/Follow/follower.ts";
import { getProfile } from "../scripts/Profile/getProfile.tsx";
import { getFollowing } from "../scripts/Follow/following.ts";
import Followers from "../components/Followers";

const Matches = () => {
  const [userMatches, setUserMatches] = useState();
  const [fetched, setFetched] = useState(false);
  const [userProfileId, setUserProfileId] = useState();

  useEffect(() => {
    (async () => {
      const { profiles } = await getProfile();

      const profileId = profiles.items[0].id;
      setUserProfileId(profileId);

      const { followers } = await getFollowers(profileId);
      console.log("matches", profileId);

      const { following } = await getFollowing();

      const userFollowers = followers.items;
      const userFollowing = following.items;

      // console.log(userFollowers);
      // console.log(userFollowing);
      const matches = userFollowers.filter((value1) => {
        return userFollowing.some((value2) => {
          return value1.wallet.address === value2.profile.ownedBy;
        });
      });
      // console.log(matches);
      setUserMatches(matches);
      setFetched(true);
    })();
  }, []);
  return (
    <div className="bg-gradient-to-r from-[#fd297b] via-[#ff5864] to-[#ff655b] h-full">
      <Followers />
      <hr className="border-2 w-[8/10] mx-5" />
      <p className="text-white text-xl mt-5  mx-48">Matches</p>
      <div className="grid grid-cols-3 m-16">
        {!fetched ? (
          <p>Fethcing.....</p>
        ) : !userMatches[0] ? (
          <p className="text-white text-2xl">No matches Found</p>
        ) : (
          userMatches.map((match) => (
            <div
              className="card w-[8/10] h-fit  backdrop-blur-lg  m-10 "
              key={match.wallet.defaultProfile.id}
            >
              <div className="m-2 mr-2 relative flex -space-x-6 overflow-hidden justify-center items-center rounded">
                <img
                  alt="img"
                  src="http://source.unsplash.com/100x100/?person"
                  className="rounded-full"
                />
                <img
                  alt="img"
                  src="http://source.unsplash.com/100x100/?human"
                  className="rounded-full"
                />
              </div>
              <div className="card-body h-1/4 w-[1/10]  bg-white rounded">
                <h2 className="card-title text-black">
                  {" "}
                  Handle : {match.wallet.defaultProfile.handle}
                </h2>
                <p className="justify-item-end text-black mb-5">
                  Profile ID :{match.wallet.defaultProfile.id}
                </p>
                <div class="card-actions items-center justify-between">
                  <button
                    class="btn btn-primary mt-5  ml-6 hover:bg-[#246BFD] bg-gradient-to-r from-[#5A90FF] via-[#3F7EFE] to-[#246BFD]  w-5/6 rounded-xl p-1 "
                    onClick={() =>
                      window.open(
                        `https://app.huddle01.com/room?roomId=${userProfileId}_${match.wallet.defaultProfile.id}`
                      )
                    }
                  >
                    Huddle Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Matches;
