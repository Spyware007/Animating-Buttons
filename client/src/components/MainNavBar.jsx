import React, { useEffect, useState } from "react";
import UserLogo from "../assets/user.png";
import MetaMaskLogo from "../assets/l1.png";

const MainNavBar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress,isLoggedIn ]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsLoggedIn(true);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };
  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  return (
    <div className="flex justify-center h-16 px-10 py-6 bg-white shadow-md border border-b-neutral-200  ">
      <div className="flex  items-center justify-between  w-full 2xl:max-w-6xl">
        <div className="flex items-center">
          <div className="mr-5">
            <img src={UserLogo} className="h-10 w-10" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            {/* <p className="text-sm text-gray-400 ">FULL STACK DEVELOPER</p> */}
            <p className="hidden md:block font-semibold mt-[-2px]">{walletAddress && walletAddress.length>0?walletAddress:"Guest User"}</p>
          </div>
        </div>

        {walletAddress && walletAddress.length > 0 ? (
          <div
            onClick={connectWallet}
            className="flex items-center gap-2 border-2 border-blue-300 shadow-md px-4 py-1 rounded-md cursor-pointer"
          >
            <img src={MetaMaskLogo} alt="" className="h-8 w-8" />
            <p className="text-gray-500">Connected</p>
          </div>
        ) : (
          <div
            onClick={connectWallet}
            className="flex items-center gap-2 bg-primary px-4 py-1 shadow-md rounded-md cursor-pointer"
          >
            <p className="text-white">Login with </p>
            <img src={MetaMaskLogo} alt="" className="h-8 w-8" />
          </div>
        )}

      </div>
    </div>
  );
};

export default MainNavBar;
