import { gql } from "@apollo/client";
import { login } from "../login-user";
import { BigNumber, utils } from "ethers";
import { apolloClient } from "../apollo-client-auth";
import { pollUntilIndexed } from "../Indexer/has-transaction-been-indexed.ts";

import { getAddress } from "../ethers-service";
const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (createProfileRequest: {
  handle: string;
  profilePictureUri?: string;
  followNFTURI?: string;
}) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

export const createProfile = async (handle: string) => {
  const address = await getAddress();
  console.log("create profile: address", address);

  console.log(handle);

  // await login(address);

  const createProfileResult = await createProfileRequest({
    handle: handle,
    profilePictureUri:
      "https://ipfs.io/ipfs/bafkreianld55uyh4e4lx7rpohpw53sn44htfnjcylsj3er6ir5wwlcg6bq",
  });

  console.log(createProfileResult);
  if (createProfileResult.data.createProfile.reason === "HANDLE_TAKEN")
    alert("Profile already taken");
  // prettyJSON("create profile: result", createProfileResult.data);
  else {
    const result = await pollUntilIndexed(
      createProfileResult.data.createProfile.txHash
    );

    console.log("create profile: profile has been indexed", result);

    const logs = result.txReceipt.logs;

    console.log("create profile: logs", logs);

    const topicId = utils.id(
      "ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)"
    );
    console.log("topicid we care about", topicId);

    const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
    console.log("profile created log", profileCreatedLog);

    let profileCreatedEventLog = profileCreatedLog.topics;
    console.log("profile created event logs", profileCreatedEventLog);

    const profileId = utils.defaultAbiCoder.decode(
      ["uint256"],
      profileCreatedEventLog[1]
    )[0];

    console.log("profile id", BigNumber.from(profileId).toHexString());

    alert(
      `Profile Created ,Profile Id:${BigNumber.from(profileId).toHexString()}`
    );
    return result.data;
  }
};
