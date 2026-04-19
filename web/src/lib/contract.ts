import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ABI = [
  "function deposit(uint256 amount)",
  "function borrow(uint256 amount)",
  "function positions(address) view returns (uint256 collateral, uint256 debt)"
];

// ✅ Get contract
export async function getContract() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

// ✅ Get position (FIXED)
export async function getPosition() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const pos = await contract.positions(address);

  return {
    collateral: ethers.formatUnits(pos.collateral, 18),
    debt: ethers.formatUnits(pos.debt, 18),
  };
}

// ================= CROSS-CHAIN CONTRACT =================

const CROSS_CHAIN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const CROSS_CHAIN_ABI = [
  "function createPosition(string source, string destination, uint256 amount)"
];

// ✅ Get Cross-chain contract
export async function getCrossChainContract() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CROSS_CHAIN_ADDRESS, CROSS_CHAIN_ABI, signer);
}