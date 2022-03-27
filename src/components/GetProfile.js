import React, { useEffect, useState } from "react";
import { getAddress } from "../scripts/ethers-service";
import { getProfile } from "../scripts/Profile/getProfile.tsx";
import axios from "axios";

const GetProfile = () => {
  const [profile, setProfile] = useState();

  const [showProfile, setShowProfile] = useState(false);
  const [userPoaps, setUserPoaps] = useState();

  const fetchPoaps = async (address) => {
    const options = {
      method: "GET",
      url: `https://api.poap.xyz/actions/scan/${address}`,
    };
    const { data } = await axios.request(options);
    console.log(data);
    const poaps = data.map((d) => {
      return {
        eventId: d.event.id,
        name: d.event.name,
        image: d.event.image_url,
      };
    });
    return poaps;
  };

  const getuserProfile = async () => {
    const data = await getProfile();

    console.log(data);

    if (data.profiles.items[0]) {
      const handle = data.profiles.items[0].handle;

      const id = data.profiles.items[0].id;
      const followers = data.profiles.items[0].stats.totalFollowers;
      const following = data.profiles.items[0].stats.totalFollowing;

      setProfile({
        handle: handle,
        id: id,

        followers: followers,
        following: following,
      });
    } else alert("You have no profile created on Lens, please create one");
  };

  useEffect(() => {
    if (!showProfile)
      (async () => {
        await getuserProfile();
        const address = await getAddress();
        const poaps = await fetchPoaps(address);
        const somepoaps = poaps.slice(0, 5);
        console.log(somepoaps);
        setUserPoaps(somepoaps);
        setShowProfile(true);
      })();
  }, [showProfile]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#fd297b] via-[#ff5864] to-[#ff655b]">
      {showProfile && (
        <div
          className="flex flex-col justify-center items-center m-10
        "
        >
          <div className="card w-fit h-fit  backdrop-blur-lg  m-10 ">
            <div className="m-2 mr-2 relative flex justify-center items-center rounded">
              <img
                src="http://source.unsplash.com/100x100/?woman"
                className="rounded-full"
              />
            </div>
            <div className="card-body h-1/4 w-[1/10]  bg-white rounded">
              <h2 className="card-title text-black">
                {" "}
                Handle : {profile.handle}
              </h2>
              <p className="justify-item-end text-black mb-5">
                Profile ID :{profile.id}
              </p>
              {userPoaps.map((poap) => (
                <div className="badge badge-outline" key={poap.eventId}>
                  {poap.name}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3">
            {userPoaps.map((poap) => (
              <div className="card w-fit h-fit m-10 justify-center items-center">
                <div className="m-2 mr-2 h-20 w-20 relative flex justify-center items-center rounded">
                  <img
                    src={poap.image}
                    alt={poap.name}
                    className="rounded-full"
                  />
                </div>

                <div
                  className="m-2 mr-2 badge badge-outline text-white"
                  key={poap.eventId}
                >
                  {poap.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProfile;
