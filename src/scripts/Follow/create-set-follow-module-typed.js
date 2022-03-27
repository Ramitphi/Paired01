// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { apolloClient } from "../apollo-client-auth";
import { gql } from "@apollo/client";

const CREATE_SET_FOLLOW_MODULE_TYPED_DATA = `
  mutation($request: CreateSetFollowModuleRequest!) { 
    createSetFollowModuleTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowModuleWithSig {
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
        deadline
        profileId
        followModule
        followModuleData
      }
     }
   }
 }
`;

export const createSetFollowModuleTypedData = (setFollowModuleRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_FOLLOW_MODULE_TYPED_DATA),
    variables: {
      request: setFollowModuleRequest,
    },
  });
};
