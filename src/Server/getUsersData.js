import { db } from "../firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const USERS_CACHE_KEY = "usersData";

export async function getUsersData() {
  const cachedData = localStorage.getItem(USERS_CACHE_KEY);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const usersCollectionRef = collection(db, "users");
  const data = await getDocs(usersCollectionRef);

  const finalData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  localStorage.setItem(USERS_CACHE_KEY, JSON.stringify(finalData));
  return finalData;
}
