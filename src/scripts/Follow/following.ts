import { gql } from "@apollo/client/core";
import { apolloClient } from "../apollo-client";
import { getAddress } from "../ethers-service";

const GET_FOLLOWING = `
  query($request: FollowingRequest!) {
    following(request: $request) { 
                items {
           profile {
              id
              name
              bio
              handle
              picture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
                  }
                  medium {
                    url
                    width
                    height
                    mimeType
                  }
                  small {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
              coverPicture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
                  }
                  small {
                    width
                    url
                    height
                    mimeType
                  }
                  medium {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
              ownedBy
              dispatcher {
                address
                canUseRelay
              }
              stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
              }
              followModule {
                ... on FeeFollowModuleSettings {
                  type
                  amount {
                    asset {
                      name
                      symbol
                      decimals
                      address
                    }
                    value
                  }
                  recipient
               }
                             ... on ProfileFollowModuleSettings {
                 type
               }
               ... on RevertFollowModuleSettings {
                 type
               }
            }
          }
        }
       pageInfo {
          prev
          next
          totalCount
       }
        }
  }
`;

const followingRequest = (walletAddress: string) => {
  return apolloClient.query({
    query: gql(GET_FOLLOWING),
    variables: {
      request: {
        address: walletAddress,
        limit: 10,
      },
    },
  });
};

export const getFollowing = async () => {
  const address = await getAddress();
  //   console.log('following: address', address);

  const result = await followingRequest(address);
  //   prettyJSON('following: result', result.data);
  console.log(result.data);

  return result.data;
};
