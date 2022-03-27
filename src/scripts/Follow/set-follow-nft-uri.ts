import { signedTypeData, splitSignature } from "../ethers-service";
import { createSetFollowNFTUriTypedData } from "./create-set-follow-nft-uri-typed-data";
import { lensHub } from "../lens-hub";

export const setFollowNftUri = async () => {
  // hard coded to make the code example clear
  const setFollowNftUriRequest = {
    profileId: "0x014a",
    // should be ipfs or reachable url with the metadata mapped
    followNFTURI:
      "https://ipfs.io/ipfs/bafkreianld55uyh4e4lx7rpohpw53sn44htfnjcylsj3er6ir5wwlcg6bq",
  };

  const result = await createSetFollowNFTUriTypedData(setFollowNftUriRequest);
  const typedData = result.data.createSetFollowNFTUriTypedData.typedData;

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.setFollowNFTURIWithSig({
    profileId: typedData.value.profileId,
    followNFTURI: typedData.value.followNFTURI,
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
