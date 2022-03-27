import { signedTypeData, getAddress, splitSignature } from "../ethers-service";
import { createFollowTypedData } from "./create-follow-typed-data";
import { lensHub } from "../lens-hub";

export const follow = async (profileId: string) => {
  const followRequest = [
    {
      profile: profileId,
    },
  ];

  const result = await createFollowTypedData(followRequest);
  const typedData = result.data.createFollowTypedData.typedData;

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.followWithSig({
    follower: getAddress(),
    profileIds: typedData.value.profileIds,
    datas: typedData.value.datas,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  //   console.log("am giveme hash");

  //   console.log(tx.hash);
  if (tx.hash) {
    alert("successfully liked");
  }
  return tx.hash;
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here:
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};
