// import { db } from "../firebase/auth";
// import { collection, getDocs } from "firebase/firestore";

// const USERS_CACHE_KEY = "usersData";

// export async function getUsersData() {
//   const cachedData = localStorage.getItem(USERS_CACHE_KEY);
//   if (cachedData) {
//     return JSON.parse(cachedData);
//   }

//   const usersCollectionRef = collection(db, "users");
//   const data = await getDocs(usersCollectionRef);

//   const finalData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   localStorage.setItem(USERS_CACHE_KEY, JSON.stringify(finalData));
//   return finalData;
// }


import { db } from "../firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

const USERS_CACHE_KEY = "usersData";

export async function getUsersData(buttonsData) {
  let data = []
  const fetchedUsers = []
  const cachedData = localStorage.getItem(USERS_CACHE_KEY);
  const fetchedUsersData = localStorage.getItem("fetchedUsers");
  if (cachedData && fetchedUsersData) {
    const preData = JSON.parse(cachedData)
    console.log(preData);
    data.push(...preData)
    fetchedUsers.push(...JSON.parse(fetchedUsersData))
  }

  const usersCollectionRef = collection(db, "users");

  buttonsData.forEach(async element => {

    const userName = element.githubUsername
    const userPresent = await checkUserPresent(fetchedUsers, userName, usersCollectionRef);
    if (userPresent)
      data.push(userPresent)
      console.log(JSON.stringify(userPresent));
      localStorage.setItem("usersData", JSON.stringify(data));
  });

  localStorage.setItem("fetchedUsers", JSON.stringify(fetchedUsers));
  console.log(data);
  console.log(JSON.stringify(data));
  try {
    
  } catch (error) {
    console.log("error", error);
  }
  return data;
}

async function checkUserPresent(fetchedUsers, userName, usersCollectionRef) {
  const exists = fetchedUsers.includes(userName)
  if (!exists) {
    fetchedUsers.push(userName)
    console.log("Pushed ", userName);
    const userData = await getData(usersCollectionRef, userName)
    return userData;
  }
}

async function getData(usersCollectionRef, username) {
  const query1 = query(usersCollectionRef, where("githubUsername", "==", username))
  const user = await getDocs(query1);
  const obj1 = (user.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  return obj1[0]
} 