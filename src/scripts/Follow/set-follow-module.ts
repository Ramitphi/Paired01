import { signedTypeData, splitSignature } from "../ethers-service";
import { createSetFollowModuleTypedData } from "./create-set-follow-module-typed";
import { lensHub } from "../lens-hub";

export const setFollowModule = async () => {
  // hard coded to make the code example clear
  const setFollowModuleRequest = {
    profileId: "0x014a",
    followModule: {
      emptyFollowModule: true,
    },
  };

  const result = await createSetFollowModuleTypedData(setFollowModuleRequest);
  console.log("set follw " + result);

  const typedData = result.data.createSetFollowModuleTypedData.typedData;
  console.log(typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.setFollowModuleWithSig({
    profileId: typedData.value.profileId,
    followModule: typedData.value.followModule,
    followModuleData: typedData.value.followModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log(tx.hash);
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here:
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};
