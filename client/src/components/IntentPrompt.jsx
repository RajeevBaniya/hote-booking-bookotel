import React from "react";
import { useAppContext } from "../context/AppContext";

const IntentPrompt = () => {
  const { setShowIntentPrompt, saveRoleIntent } = useAppContext();

  return (
    <div
      onClick={() => setShowIntentPrompt(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-md p-6"
      >
        <h3 className="text-xl font-semibold mb-2">What brings you here?</h3>
        <p className="text-gray-600 mb-6">Choose your primary goal.</p>
        <div className="flex flex-col gap-3">
          <button
            className="w-full border border-gray-300 rounded-md py-2 hover:bg-gray-50"
            onClick={() => saveRoleIntent("booker")}
          >
            I want to book hotels
          </button>
          <button
            className="w-full bg-black text-white rounded-md py-2 hover:bg-gray-800"
            onClick={() => saveRoleIntent("ownerCandidate")}
          >
            I want to list my hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntentPrompt;


