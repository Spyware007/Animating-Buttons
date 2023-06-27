import { db } from "../firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export async function getButtonsData() {
  const buttonCollectionRef = collection(db, "buttons");
  const data = await getDocs(buttonCollectionRef);

  const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return buttonsData;
}
