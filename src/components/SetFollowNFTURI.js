import React, { useState } from "react";
import axios from "axios";
import { setFollowNftUri } from "../scripts/Follow/set-follow-nft-uri.ts";

const SetFollowMFT = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  const uploadFile = async () => {
    const formData = new FormData();

    formData.append("file", file.name);

    console.log(formData);
    const res = await axios({
      method: "post", // default
      baseURL: "https://api.nftport.xyz/v0/metadata",
      headers: {
        "Content-Type": "image/jpeg",
        Authorization: "82d8af12-45c8-40d0-aced-2eac36fe0a3c",
      },
      data: formData,
    });
    console.log(res);
  };

  return (
    <div>
      <div>
        <label className="m-3">Choose the file for NFT</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button onClick={() => uploadFile()}>Upload File</button>
      <button
        onClick={() => setFollowNftUri()}
        className="bg-black text-white border-2 rounded-lg p-2"
      >
        Set Follow NFT URI
      </button>
    </div>
  );
};

export default SetFollowMFT;
