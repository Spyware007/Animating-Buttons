import { db } from "../firebase/auth";
import { collection, getCountFromServer, doc, getDoc, query, getDocs, limit, orderBy, startAfter, where } from "firebase/firestore";
import { toast } from "react-hot-toast";

const BUTTONS_CACHE_KEY = "buttonsData";
const LAST_DOC_CACHE_KEY = "lastDocId";
const FETCHED_PAGE_KEY = "fetchedPage";

const buttonCollectionRef = collection(db, "buttons");
let lastDocId;
const pageLimit = 9;

// Enhanced error handling utility
const handleError = (error, context) => {
  console.error(`Error in ${context}:`, error);
  toast.error(`Failed to ${context}. Please try again.`);
  return null;
};

export async function getTotalBtns() {
  try {
    const q = query(buttonCollectionRef, where("status", "==", "approved"));
    const count = await getCountFromServer(q);
    return count.data().count;
  } catch (error) {
    return handleError(error, "fetch total buttons count");
  }
}



export async function getButtonsData() {
  try {
    const cachedData = localStorage.getItem(BUTTONS_CACHE_KEY);
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (parseError) {
        console.warn("Cached data is corrupted, fetching fresh data");
        localStorage.removeItem(BUTTONS_CACHE_KEY);
      }
    }

    const firstQuery = query(buttonCollectionRef, where("status", "==", "approved"), orderBy("likeCounter", "desc"), limit(pageLimit));
    const data = await getDocs(firstQuery);
    
    if (data.empty) {
      return [];
    }

    lastDocId = data.docs[data.docs.length - 1].id;
    const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(buttonsData));
    localStorage.setItem(FETCHED_PAGE_KEY, "1");
    localStorage.setItem(LAST_DOC_CACHE_KEY, JSON.stringify(lastDocId));
    
    return buttonsData;
  } catch (error) {
    return handleError(error, "fetch buttons data") || [];
  }
}


export async function nextData(pageNumber) {
  try {
    const fetchedPage = parseInt(localStorage.getItem(FETCHED_PAGE_KEY)) || 1;
    
    if (pageNumber <= fetchedPage) {
      return null;
    }

    const previousData = localStorage.getItem(BUTTONS_CACHE_KEY);
    if (!previousData) {
      throw new Error("No cached data found for pagination");
    }

    const preData = JSON.parse(previousData);
    lastDocId = JSON.parse(localStorage.getItem(LAST_DOC_CACHE_KEY));
    
    if (!lastDocId) {
      throw new Error("Last document ID not found");
    }

    const lastDocRef = doc(buttonCollectionRef, lastDocId);
    const lastDocData = await getDoc(lastDocRef);
    
    if (!lastDocData.exists()) {
      throw new Error("Last document no longer exists");
    }

    const secondQuery = query(
      buttonCollectionRef, 
      where("status", "==", "approved"),
      orderBy("likeCounter", "desc"), 
      startAfter(lastDocData), 
      limit(pageLimit)
    );
    
    const data = await getDocs(secondQuery);
    
    if (data.empty) {
      return [];
    }

    lastDocId = data.docs[data.docs.length - 1].id;
    const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    const updatedData = [...preData, ...buttonsData];
    localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(updatedData));
    localStorage.setItem(FETCHED_PAGE_KEY, pageNumber.toString());
    localStorage.setItem(LAST_DOC_CACHE_KEY, JSON.stringify(lastDocId));
    
    return buttonsData;
  } catch (error) {
    return handleError(error, "fetch next page data") || [];
  }
}

export async function getPageNoData(pageNumber) {
  try {
    const fetchedPage = parseInt(localStorage.getItem(FETCHED_PAGE_KEY)) || 1;
    
    if (fetchedPage >= pageNumber) {
      return null;
    }

    const previousData = localStorage.getItem(BUTTONS_CACHE_KEY);
    if (!previousData) {
      throw new Error("No cached data found for pagination");
    }

    const preData = JSON.parse(previousData);
    lastDocId = JSON.parse(localStorage.getItem(LAST_DOC_CACHE_KEY));
    
    if (!lastDocId) {
      throw new Error("Last document ID not found");
    }

    const lastDocRef = doc(buttonCollectionRef, lastDocId);
    const lastDocData = await getDoc(lastDocRef);
    
    if (!lastDocData.exists()) {
      throw new Error("Last document no longer exists");
    }

    const itemsToFetch = (pageNumber - fetchedPage) * pageLimit;
    
    const query1 = query(
      buttonCollectionRef, 
      where("status", "==", "approved"),
      orderBy("likeCounter", "desc"), 
      startAfter(lastDocData), 
      limit(itemsToFetch)
    );
    
    const data = await getDocs(query1);
    
    if (data.empty) {
      return [];
    }

    lastDocId = data.docs[data.docs.length - 1].id;
    const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    const updatedData = [...preData, ...buttonsData];
    localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(updatedData));
    localStorage.setItem(FETCHED_PAGE_KEY, pageNumber.toString());
    localStorage.setItem(LAST_DOC_CACHE_KEY, JSON.stringify(lastDocId));
    
    return buttonsData;
  } catch (error) {
    return handleError(error, "fetch page data") || [];
  }
}

// Clear pagination cache utility
export function clearPaginationCache() {
  localStorage.removeItem(BUTTONS_CACHE_KEY);
  localStorage.removeItem(LAST_DOC_CACHE_KEY);
  localStorage.removeItem(FETCHED_PAGE_KEY);
  lastDocId = null;
}