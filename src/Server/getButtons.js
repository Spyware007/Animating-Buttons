import { db } from "../firebase/auth";
import { collection, getCountFromServer, doc, getDoc, query, getDocs, limit, orderBy, startAfter } from "firebase/firestore";

const BUTTONS_CACHE_KEY = "buttonsData";


const buttonCollectionRef = collection(db, "buttons");
var lastDocId;
const pageLimit = 9

export async function getTotalBtns() {
  const count = await getCountFromServer(buttonCollectionRef)
  return (count.data().count)
  // return count
}



export async function getButtonsData() {
  const cachedData = localStorage.getItem(BUTTONS_CACHE_KEY);
  if (cachedData) {
    const data = JSON.parse(cachedData)
    return JSON.parse(cachedData);
  }

  const firstQuery = query(buttonCollectionRef, orderBy("likeCounter", "desc"), limit(pageLimit))
  const data = await getDocs(firstQuery);
  // const lastDoc1 = Firestore.toJSON(buttonCollectionRef)
  lastDocId = data.docs[data.docs.length - 1].id
  console.log(lastDocId);
  const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(buttonsData));
  localStorage.setItem("fetchedPage", 1)
  localStorage.setItem("lastDocId", JSON.stringify(lastDocId))
  return buttonsData;
}


export async function nextData(pageNumber) {

  if (pageNumber > localStorage.getItem("fetchedPage")) {

    const previousData = localStorage.getItem(BUTTONS_CACHE_KEY);
    const preData = JSON.parse(previousData)
    lastDocId = JSON.parse(localStorage.getItem("lastDocId"))
    const lastDocRef = doc(buttonCollectionRef, lastDocId)
    const lastDocData = await getDoc(lastDocRef)

    const secondQuery = query(buttonCollectionRef, orderBy("likeCounter", "desc"), startAfter(lastDocData), limit(pageLimit))
    const data = await getDocs(secondQuery)

    lastDocId = data.docs[data.docs.length - 1].id

    const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    preData.push(...buttonsData)
    const buttonsDataString = JSON.stringify(preData)
    localStorage.setItem(BUTTONS_CACHE_KEY, buttonsDataString)
    localStorage.setItem("fetchedPage", pageNumber)
    localStorage.setItem("lastDocId", JSON.stringify(lastDocId))
    return buttonsData
    // return getData()
  }
  return null
}

export async function getPageNoData(pageNumber) {
  const fetchedPage = localStorage.getItem("fetchedPage")
  if (fetchedPage < pageNumber) {
    const previousData = localStorage.getItem(BUTTONS_CACHE_KEY);
    const preData = JSON.parse(previousData)
    lastDocId = JSON.parse(localStorage.getItem("lastDocId"))
    console.log(lastDocId);
    const lastDocRef = doc(buttonCollectionRef, lastDocId)
    const lastDocData = await getDoc(lastDocRef)
    const limit1 = (pageNumber - fetchedPage) * pageLimit
    console.log(limit1);
    const query1 = query(buttonCollectionRef, orderBy("likeCounter", "desc"), startAfter(lastDocData), limit(limit1))
    const data = await getDocs(query1)
    lastDocId = data.docs[data.docs.length - 1].id
    const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    preData.push(...buttonsData)
    const buttonsDataString = JSON.stringify(preData)
    localStorage.setItem(BUTTONS_CACHE_KEY, buttonsDataString)
    localStorage.setItem("fetchedPage", pageNumber)
    localStorage.setItem("lastDocId", JSON.stringify(lastDocId))
    return buttonsData
  }

}