import {
    MdOutlineLibraryBooks,
    MdOutlineDashboard,
    MdOutlineListAlt,
    MdOutlineWallet,
    MdOutlineHome
  } from "react-icons/md";
  
  export const sidebarConstant = [
    {
      path:"/",
      name:"Home",
      icon: MdOutlineHome
    },
    {
      path:"/dashboard",
      name:"Dashboard",
      icon: MdOutlineDashboard
    },
    {
      path:"/orders",
      name:"Orders",
      icon: MdOutlineListAlt
    },
    {
      path:"/projects",
      name:"Projects",
      icon: MdOutlineLibraryBooks
    },
    // {
    //   path:"/cryptowallet",
    //   name:"Crypto Wallet",
    //   icon: MdOutlineWallet
    // },
  ];
  