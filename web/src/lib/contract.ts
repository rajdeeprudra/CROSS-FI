import { ethers } from "ethers";

export const LENDING_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ABI = [
  "function deposit(uint256 amount)",
  "function borrow(uint256 amount)",
  "function repay(uint256 amount)",
  "function healthFactor(address user) view returns (uint256)"
];

export async function getContract() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(LENDING_ADDRESS, ABI, signer);
}


