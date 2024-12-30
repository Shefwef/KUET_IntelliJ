 import React, { useContext, createContext } from 'react';
import { prepareContractCall,defineChain } from "thirdweb"
import { useSendTransaction,useReadContract } from "thirdweb/react";

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const ChainId=defineChain(11155111);
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {


    const { contract } = useContract("0x8F0878E53eCfC1B271f829c12f78c19E6ED44549");
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'create_campaign');

    const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }
  const donate = async (pId, amount) => {
    const data = await contract.call('donate_to_campaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }
 // Define the getCampaigns function
 const getDonations = async (pId) => {
  const donations = await contract.call('get_donators', [pId]);
  const numberOfDonations = donations[0].length;

  const parsedDonations = [];

  for(let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString())
    })
  }

  return parsedDonations;
}
const getDonatedCampaigns = async () => {
  try {
    // Fetch all campaigns using getCampaigns
    const allCampaigns = await getAllCampaigns(contract);

    // Initialize an array to store donated campaigns
    const donatedCampaigns = [];

    // Loop through all campaigns and check donations
    for (let i = 0; i < allCampaigns.length; i++) {
      const donations = await getDonations(i); // Get donations for the campaign

      // Check if the current wallet address is a donator
      const hasDonated = donations.some((donation) => donation.donator.toLowerCase() === address.toLowerCase());

      if (hasDonated) {
        donatedCampaigns.push(allCampaigns[i]); // Add to donated campaigns
      }
    }

    return donatedCampaigns;
  } catch (err) {
    console.error("Error in getDonatedCampaigns function:", err);
    return [];
  }
};

const getCampaigns = async (contract) => {
  if (!contract) {
    console.error("Contract is not available.");
    return [];
  }

  try {
    const currentTime = new Date().getTime(); // Get the current timestamp

    // Fetch all campaigns
    const campaigns = await contract.call("getCampaigns");

    // Filter campaigns where the deadline has not passed
    const validCampaigns = campaigns?.filter((campaign) => {
      return campaign.deadline.toNumber() > currentTime; // Only include campaigns with a future deadline
    });

    // Parse the filtered valid campaigns
    const parsedCampaigns = validCampaigns?.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.collected_amount.toString()),
      image: campaign.image,
      pId: i,
    })) || [];

    return parsedCampaigns;

  } catch (err) {
    console.error("Error in getCampaigns function:", err);
    return [];
  }
};
const getAllCampaigns = async (contract) => {
  if (!contract) {
    console.error("Contract is not available.");
    return [];
  }

  try {
    // Fetch all campaigns without filtering by deadline
    const campaigns = await contract.call("getCampaigns");

    // Parse the campaigns data
    const parsedCampaigns = campaigns?.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.collected_amount.toString()),
      image: campaign.image,
      pId: i,
    })) || [];

    return parsedCampaigns;

  } catch (err) {
    console.error("Error in getAllCampaigns function:", err);
    return [];
  }
};
// Define the getUserCampaigns function
const getUserCampaigns = async () => {
  try {
    // Fetch all campaigns using getCampaigns
    const allCampaigns = await getCampaigns(contract);

    // Filter campaigns where the owner matches the current user's address
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner.toLowerCase() === address.toLowerCase());

    return filteredCampaigns;
  } catch (err) {
    console.error("Error in getUserCampaigns function:", err);
    return [];
  }
};

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns: () => getCampaigns(contract),
        getUserCampaigns,
        getAllCampaigns,
        getDonations,
        getDonatedCampaigns,
        donate
        
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext);  


