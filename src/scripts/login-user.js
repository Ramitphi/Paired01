import { getAddress, signText } from "./ethers-service";
import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";

export const login = async () => {
  // we grab the address of the connected wallet
  const address = await getAddress();
  console.log(address);
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);
  console.log(challengeResponse);

  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text);
  //   console.log(signature);

  const accessTokens = await authenticate(address, signature);
  console.log(accessTokens);
  localStorage.setItem("token", accessTokens.data.authenticate.accessToken);
  return accessTokens;
};
