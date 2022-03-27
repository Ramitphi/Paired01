import React from "react";
import { setFollowModule } from "../scripts/Follow/set-follow-module.ts";
const SetFollow = () => {
  return (
    <div>
      <button
        onClick={() => setFollowModule()}
        className="bg-black text-white border-2 rounded-lg p-2"
      >
        Set Follow Module
      </button>
    </div>
  );
};

export default SetFollow;
