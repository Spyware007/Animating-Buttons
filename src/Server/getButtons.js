import { db } from "../firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const BUTTONS_CACHE_KEY = "buttonsData";

export async function getButtonsData() {
  const cachedData = localStorage.getItem(BUTTONS_CACHE_KEY);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const buttonCollectionRef = collection(db, "buttons");
  const data = await getDocs(buttonCollectionRef);

  const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(buttonsData));
  return buttonsData;
}
