// import { db } from "../firebase/auth";
// import { collection, getDocs,limit } from "firebase/firestore";

// const BUTTONS_CACHE_KEY = "buttonsData";

// export async function getButtonsData() {
//   const cachedData = localStorage.getItem(BUTTONS_CACHE_KEY);
//   if (cachedData) {
//     return JSON.parse(cachedData);
//   }

//   const buttonCollectionRef = collection(db, "buttons");
//   const data = await getDocs(buttonCollectionRef,limit(6));

//   const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(buttonsData));
//   return buttonsData;
// }





import { db } from "../firebase/auth";
import { collection, getDocs, limit, query, startAfter,orderBy ,startAt} from "firebase/firestore";
let document=[];



const BUTTONS_CACHE_KEY = "buttonsData";

export async function getButtonsData() {
  const cachedData = localStorage.getItem(BUTTONS_CACHE_KEY);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const buttonCollectionRef = collection(db,"buttons");
  const pageSize = 6;
  let q = query(buttonCollectionRef, orderBy("likeCounter","desc"),limit(pageSize));

  const data = await getDocs(q);
  const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(buttonsData));

  console.log("btn data--",buttonsData[0])

  buttonsData.map((item)=>{
    console.log("btnnnnnnnn----datttt",item.githubUsername)
  })


// console.log("noraml---",data.docs[data.docs.length-1]._document.data.value.mapValue.fields)

console.log("noraml---",data.docs[data.docs.length-1])
  // const lastDocument = JSON.stringify(data.docs[data.docs.length - 1]._document.data.value.mapValue.fields);
  console.log("first ---log",localStorage.getItem("lastDoc"))
  document=data?.docs[data.docs.length - 1]

  // if (lastDocument) {
  //  
  //   // localStorage.setItem("lastDoc", lastDocument);
  // } else {
  //  
  //   localStorage.removeItem("lastDoc");
  // }

  return buttonsData;
}





export async function getMoreButtonsData() {
  // const LastDocument = JSON.parse(localStorage.getItem("lastDoc"));

  // console.log("last -----",LastDocument)

  // console.log("last doc id--",LastDocument)

  // if (!LastDocument) {
  //   return []; // If there is no lastDocumentId, it means there are no more documents to fetch
  // }

  const buttonCollectionRef = collection(db, "buttons");
  const pageSize = 6;

  let q = query(
    buttonCollectionRef,
    orderBy("likeCounter","desc"),
    startAfter(document),
    limit(pageSize)
  );
  const data = await getDocs(q);
  const buttonsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  // let localdata=JSON.parse(localStorage.getItem(BUTTONS_CACHE_KEY))
  const localdata = JSON.parse(localStorage.getItem(BUTTONS_CACHE_KEY)) || [];
  // let updatedData=[...localdata,buttonsData]
  const updatedData = [...localdata, ...buttonsData];
  localStorage.setItem(BUTTONS_CACHE_KEY, JSON.stringify(updatedData));




  
  buttonsData.map((item)=>{
    
    console.log("next data--",item.githubUsername)

  })

 
  document = data.docs[data.docs.length - 1];
  if(!document){
    console.log("there is no data")
    return []
  }
  // if (lastDocument) {
  //   localStorage.setItem("lastDoc", lastDocument);
  // } else {
  //   localStorage.removeItem("lastDoc");
  // }

  return buttonsData;
}




