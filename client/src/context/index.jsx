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
 // Define the getCampaigns function
const getCampaigns = async (contract) => {
  if (!contract) {
    console.error("Contract is not available.");
    return [];
  }

  try {
    // Directly call the getCampaigns method on the contract
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
    console.error("Error in getCampaigns function:", err);
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
        getUserCampaigns
        
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext);  


