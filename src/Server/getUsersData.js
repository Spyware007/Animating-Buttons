import { db } from "../firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export async function getUsersData() {
  const usersCollectionRef = collection(db, "users");
  const data = await getDocs(usersCollectionRef);

  const finalData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return finalData;
}
