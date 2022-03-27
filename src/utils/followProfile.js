import { getProfile } from "../scripts/Profile/getProfile.tsx";
import { follow } from "../scripts/Follow/follow.ts";

export const getFollowModule = async (params) => {
  const followModule = await getProfile({ profileIds: ["0x018e"] });
  console.log(followModule);
  return followModule;
};

export const followProfile = async (params) => {
  const res = await follow("0x018e");
  if (res) alert("successfully followed");
};
