import axios from "axios";

export const fetchPoaps = async (apiparams) => {
  const options = {
    method: "GET",
    url: "http://api.poap.xyz/actions/scan/0x55f5429343891f0a2b2a8da63a48e82da8d9f2f6",
  };
  const { data } = await axios.request(options);
  const poaps = data.map((d) => {
    return { eventId: d.event.id, name: d.event.name };
  });
  return poaps;
};
