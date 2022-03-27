import React, { useEffect, useState } from "react";
import axios from "axios";
// import { recommendedProfile } from "../scripts/Profile/recommended-profiles.ts";
import { getAddress } from "../scripts/ethers-service";
import { getProfile } from "../scripts/Profile/getProfile.tsx";
import TinderCard from "react-tinder-card";
import "./ShowProfile.css";
import { follow } from "../scripts/Follow/follow.ts";

const ShowProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [followInput, setFollowInput] = useState();

  const [recommProfilePOAP, setRecommProfilePOAP] = useState([]);

  const [recommendations, setRecommendations] = useState([]);
  const [userPoaps, setUserPoaps] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [allfetch, setAllfetch] = useState(false);

  const recommprofiles = [];
  const lensprofiles = [];

  const [allProfileFetch, setAllProfilesFetch] = useState(false);

  //swipe cards

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log(direction);
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // addresses taken from , polygonscan (mumbai testnet)
  const recommendationaddress = [
    "0xbba7556f668a78dba5e7989b0d7ca4db6315546e",
    "0xa6e92503837612f1bb5ad10aa59461cf8a53bc54",
    "0xdd372842cb80c1892243d20ee4ad0979c293cad5",
    "0x5d81ae293cbebdcd0fe57f62068bb763e56581ac",
    "0x406b887feb1661d33b890aa5d5df641c82502929",
    "0x2fd5c1659a82e87217df254f3d4b71a22ae43ee3",
    "0xa5cdd8fabc5996462aa5314ee8c374cb0fd13009",
    "0x52eaf3f04cbac0a4b9878a75ab2523722325d4d4",
    "0x633e8b8adce8d98ebc2ae2b8ef2d176221e58a70",
    "0xecb4c1245665e8a1f43826355aab0dd6bf336e05",
    "0x01d79bceaeaadfb8fd2f2f53005289cfcf483464",
    "0x0265b3921e3226af7b2fc431385b4157e0c762db",
    "0x03bf0283fc16838eb1de0565dcc23c93d0995999",
    "0x059db4f21ac51462efbbc4ec336ba008d2872108",
    "0x0750cfcae29bb658198e1539eef3ef919739cade",
    "0x09928cebb4c977c5e5db237a2a2ce5cd10497cb8",
    "0x0c758f326d6700db37b5d7515ae734c5b4cb8668",
    "0x0f0dffdba4ad41352e1bd2835393eb68303e1d79",
    "0x0ffef158d00fbf2170efd66d13c58018cfb72adb",
    "0x104d5c4f62c0fcdef40fbc4a7558f42f0c952fcb",
    "0x11b15deb3c477cd18fac5b9ac5f13041f304ea14",
    "0x13df914cfe0b54f256f0eba318e629fba70933a1",
    "0x18cabf0d807ba68e124168a48216e8cb8f5decf4",
    "0x1960733e0087b50fdfb656ea572deffc2ff69dc2",
    "0x1aabf1c8006a22d67dd0d93595652d108e910a08",
    "0x1b1dc97defcc30f9b428ef51ec49daa2aad1e1cb",
    "0x1b775dada3eca17a87c7710ca5751dd55921d1d5",
    "0x1c1495984b852b18f5f6ab503b555b6339f8b490",
    "0x235596f35fdeac45a59bf38640dd68f19a85de39",
    "0x248ba21f6ff51cf0cd4765c3bc9fad2030a591d5",
    "0x268d77d4f480ca6a5b5785ec2e8413dc9a645221",
    "0x28db2b440686a1adca8d841b090330d88234a8c9",
    "0x291d73e4cd05d4342dab8fe9dfe3dc5c285db7b0",
    "0x2b59fd03d176afc335fa6d4fbcdf5cf48a6844fb",
    "0x2f11bdcc9136e1902c5824dada8195d33dd4822b",
    "0x2fd5c1659a82e87217df254f3d4b71a22ae3ee3",
    "0x2fe5b3e5e1e72a6aafac440ee6a3a0db63fd8391",
    "0x30b0eae5e9df8a1c95dfdb7af86aa4e7f3b51f13",
    "0x39d637737cc76c5849a52c7d3b872a1eb22aa71c",
    "0x3a5bd1e37b099ae3386d13947b6a90d97675e5e3",
    "0x406b887feb1661d33b890aa5d5df641c82502929",
    "0x4132ac61083429ba28e48fa3d2e98d160b502492",
    "0x422938990fed07aeb904260b1094943afc2e366d",
    "0x42a578e3557f5854b27d48e7d753feb2f428546d",
    "0x42d4413145770ad431d81a1f345da379613707c2",
    "0x438e2ec928a5975113da95e0114cc3b075ba5adc",
    "0x48e07d182322424d1851ae669c65487aa9508bbc",
    "0x493eda97486ec88c9c79404476b3db71699a4040",
    "0x4c70d50dabbcc68c3a8b3bb0d7330ee097752fde",
    "0x4f51e8b03cf03de9de407650a2b29c35311da1c3",
    "0x52d447e2eb83e3ef7c267b45abcb6f7382f0f9ab",
    "0x52eaf3f04cbac0a4b9878a75ab2523722325d4d4",
    "0x60b4e7742328ef121ff4f5df513ca1d4e3ba2e04",
    "0x633e8b8adce8d98ebc2ae2b8ef2d176221e58a70",
    "0x634291b543e9d5956f4869f03d836625be945160",
    "0x637bd60826ac389ab08f578db51dfb4de3b167fe",
    "0x650d8ba83289d3bae3733c5c380deb9c9278067b",
    "0x67cf3bf40b2b3b3d68f6c361aef81f8aeb2db637",
    "0x69fdc8854bb8b89074d8d4bcd9cbe082858434fa",
    "0x6ca6b4a9f34d0606880ee5a12060025288b5d863",
    "0x6cf6a0384be2e95179c692047361f8fa944a8bda",
    "0x6ea7c12cbb8480236716d1eeb0b31c2950166f3b",
    "0x6f234fa20558743970ccebd6af259fcb49eea73c",
    "0x7084c8a2943df2115c4ca9b70ce6b963a5993906",
    "0x75e934e4877317b781cf2c55718c1a1066ddc388",
    "0x779cb8bdb7b40bcb942110e6ed96c376a3ce4ec0",
    "0x780ba734d3d7c867c457f71aadd100bbe8c6eac1",
    "0x79b1b1ffb3c6d1d107b06967e167e2e1de63d931",
    "0x7b1c1702a09521b4160f79f853b7f54ba6b35a59",
    "0x905040585A59C5B0E83Be2b247fC15a81FF4E533",
    "0xDd582557c1f9c65650c65B18a76C02aa297Dff59",
    "0xe430b68916717ebc7f824ccb59ea8b87e3a4b34e",
    "0x17f5ac89ad0940EeD866566BFb98F1f52b6d4De7",
    "0x5007b3806d8D69CA86BB5E8DcB51F039A553F764",
  ];

  const getProfiles = async (params) => {
    const {
      profiles: { items },
    } = await getProfile({
      ownedBy: params.address,
    });

    // console.log("in profile", items);

    const profile = {
      id: items[0].id,
      handle: items[0].handle,
      followers: items[0].stats.totalFollowers,
      following: items[0].stats.totalFollowing,
    };

    return { address: params.address, profile };
  };

  const fetchPoaps = async (address) => {
    const options = {
      method: "GET",
      url: `https://api.poap.xyz/actions/scan/${address}`,
    };
    const { data } = await axios.request(options);
    const poaps = data.map((d) => {
      return { eventId: d.event.id, name: d.event.name };
    });
    return poaps;
  };

  const checkPoap = async (address) => {
    try {
      const options = {
        method: "GET",
        url: `https://api.poap.xyz/actions/scan/${address}`,
      };

      const { data } = await axios.request(options);
      const recommpoaps = data.map((d) => {
        return d.event.id;
      });

      const commonPoaps = userPoaps.filter((value1) => {
        return recommpoaps.some((value2) => {
          return value1.eventId === value2;
        });
      });
      return { address, commonPoaps };
    } catch (e) {
      console.log(e);
    }
  };

  const merge = async (arr1, arr2) => {
    const res = arr2.map((ele1) => {
      const p = arr1.find((ele2) => ele1.address === ele2.address);

      return { profiles: p, poap: ele1 };
    });

    setRecommProfilePOAP(res);
    setShowProfile(true);
  };

  useEffect(() => {
    if (!userPoaps) {
      (async () => {
        const address = await getAddress();
        const poaps = await fetchPoaps(address);
        setUserPoaps(poaps);
        // console.log(poaps);
      })();
    } else if (userPoaps && !allfetch) {
      const e = recommendationaddress.map(async (recommadress) => {
        const result = await checkPoap(recommadress);
        if (result && result.commonPoaps && result.commonPoaps.length !== 0) {
          recommprofiles.push({
            address: result.address,
            Poaps: result.commonPoaps,
          });
        }
      });
      // console.log(e);
      Promise.all(e).then(() => {
        setRecommendations(recommprofiles);
        setAllfetch(true);
      });
    } else if (userPoaps && allfetch && !allProfileFetch) {
      const e = recommendations.map(async (recomm) => {
        const result = await getProfiles(recomm);

        console.log("fetching usr profiles....");
        lensprofiles.push({ address: result.address, profile: result.profile });
      });

      // console.log(e);
      Promise.all(e).then(() => {
        setProfiles(lensprofiles);
        setAllProfilesFetch(true);
        // setShowProfile(true);
      });
    } else if (
      allProfileFetch &&
      allfetch &&
      userPoaps &&
      !recommProfilePOAP[0]
    ) {
      console.log("im in");
      merge(profiles, recommendations);
    }
  }, [userPoaps, allfetch, recommendations, allProfileFetch]);

  return (
    <div className="bg-gradient-to-r  from-[#fd297b] via-[#ff5864] to-[#ff655b] h-full justify-center ">
      <h1 className="intro">Discover your Poap Frenz</h1>
      {showProfile ? (
        recommProfilePOAP.map((profilepoap) => (
          <TinderCard
            className="swipe"
            key={profilepoap.profiles.profile.handle}
            onSwipe={async (dir) => {
              console.log(dir);
              if (dir === "right") {
                await follow(profilepoap.profiles.profile.id);
              }
              swiped(dir, profilepoap.profiles.profile.handle);
            }}
            onCardLeftScreen={() =>
              outOfFrame(profilepoap.profiles.profile.handle)
            }
          >
            <div class="max-w-sm w-[32rem] min-h-[22rem] rounded-[24px] overflow-auto bg-white shadow-lg">
              <div class="m-2 mr-2 relative flex justify-center items-center rounded-full">
                <img
                  alt="mathces"
                  src="http://source.unsplash.com/100x100/?woman"
                  class="rounded-full"
                />
              </div>
              <div class="flex flex-col px-6 py-6 justify-center ">
                <div class="font-bold text-xl mb-2">
                  {profilepoap.profiles.profile.handle}
                </div>
                <p class="text-gray-700 text-base">
                  Profile ID :{profilepoap.profiles.profile.id}
                </p>
              </div>
              <div className="flex flex-col text-white px-6 py-6">
                {profilepoap.poap.Poaps.slice(0, 3).map((poap) => (
                  <div class="badge badge-outline min-w-full">{poap.name}</div>
                ))}
              </div>
            </div>
          </TinderCard>
        ))
      ) : (
        <p className="text-white text-3xl ">Fetching.....</p>
      )}
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
      {showProfile && !recommProfilePOAP[0] && (
        <div className="flex flex-col items-center">
          <p className="mt-44 ml-10 text-white text-xl">
            Sorry,We didn't find any lens profiles with common POAP
          </p>
          <div className="m-20 flex flex-col items-center">
            <>
              <label className="text-white text-2xl">Follow by ProfileId</label>
              <input
                type="text"
                className="m-2 border-2 rounded-lg h-10 w-full  border-red-400 hover:border-red-700 text-black "
                onChange={(e) => setFollowInput(e.target.value)}
              ></input>
            </>
            <button
              onClick={async () => await follow(followInput)}
              className="hover:bg-red-300 text-black bg-white  hover:text-white border-2 rounded-lg p-2 m-5  w-full"
            >
              Follow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProfiles;
