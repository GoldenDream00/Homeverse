import { ethers } from "ethers";
import { CONTRACT_ABI } from 'configs/app-config';

const { ethereum } = window;
const provider = ethereum && ethereum.isMetaMask ? new ethers.providers.Web3Provider(ethereum) : null;
const signer = ethereum && ethereum.isMetaMask ? provider.getSigner() : null;

export const homeverseioContract = new ethers.Contract("0x4766fACdbb794571ff5651aC0dab90751ECebf16", CONTRACT_ABI, signer);