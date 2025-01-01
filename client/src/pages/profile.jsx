import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();
  const { user, isAuthenticated } = useAuth0();

  const fetchCampaigns = async () => {
    setIsLoadingCampaigns(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoadingCampaigns(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Profile Section */}
      {isAuthenticated && user && (
        <div
          className="profile-container p-6 rounded-lg shadow-md relative"
          style={{
            backgroundImage: "linear-gradient(135deg, #1c1c24, #2a2d35)",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Profile Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user.picture}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-[#1dc071]"
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1dc071] flex items-center justify-center"
                title="Active"
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="text-2xl text-[#6a5acd] font-bold">{user.name}</h2>
              <p className="text-sm text-[#b3b3c0] flex items-center gap-2">
                <span className="material-icons text-[#1dc071]">email</span>
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button className="bg-[#1dc071] text-white px-4 py-2 rounded-md hover:bg-[#16a066] transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Campaigns Section */}
      <div className="mt-6">
        <DisplayCampaigns
          title="Your Campaigns"
          isLoading={isLoadingCampaigns}
          campaigns={campaigns}
        />
      </div>
    </div>
  );
};

export default Profile;
