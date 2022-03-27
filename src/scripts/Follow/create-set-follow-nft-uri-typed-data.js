// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { apolloClient } from "../apollo-client-auth";

import { gql } from "@apollo/client";

const CREATE_SET_FOLLOW_NFT_URI_TYPED_DATA = `
  mutation($request: CreateSetFollowNFTUriRequest!) { 
    createSetFollowNFTUriTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowNFTURIWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        profileId
        deadline
        followNFTURI
      }
     }
   }
 }
`;

export const createSetFollowNFTUriTypedData = (setFollowNFTUriRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_FOLLOW_NFT_URI_TYPED_DATA),
    variables: {
      request: setFollowNFTUriRequest,
    },
  });
};
