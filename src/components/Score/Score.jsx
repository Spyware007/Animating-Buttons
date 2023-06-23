import React, { useEffect, useState } from "react";
import classes from "./Score.module.css";
import { Link } from "react-router-dom";
import memoji from "../../assets/memoji.png";
import { collection, getDocs, } from 'firebase/firestore'
import { db } from "../../firebase/auth"
import Loader from "../common/Loader/Loader";

const Score = () => {

  const [buttons, setButtons] = useState([])
  const [users, setUsers] = useState([])
  const [currentList, setCurrentList] = useState('likes')
  const [dropdown, setDropdown] = useState(false)





  useEffect(() => {
    fetchButtons();
  }, [])

  async function fetchButtons() {
    const btnsCol = collection(db, "buttons");
    const usersCol = collection(db, "users");

    const btnsSnapshot = await getDocs(btnsCol);
    const usersSnapshot = await getDocs(usersCol);

    const btnsList = btnsSnapshot.docs.map(doc => doc.data());
    const usersList = usersSnapshot.docs.map(doc => doc.data());



    setButtons(btnsList);
    setUsers(usersList);
    buttons.sort((a, b) => b.likeCounter - a.likeCounter)
  }

  function getProfilePicture(username) {
    // find the user object that matches the input parameter
    let user = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    return user ? (user.profilePictureUrl) : memoji;
  }


  // const cleanedArray = Data.map((item) => item.replace(/_\d+$/, ""));
  const cleanedArray = buttons.map(btn => btn.githubUsername)
  const uniqueValues = new Set(cleanedArray);

  const hashmap = {};


  uniqueValues.forEach((item) => {
    const count = cleanedArray.filter((value) => value === item).length;
    hashmap[item] = count;
  });

  var totalLikes = buttons.reduce(function (acc, cur) {
    acc[cur.githubUsername] = (acc[cur.githubUsername] || 0) + cur.likeCounter;
    return acc;
  }, {});

  const sortedUsers = Object.entries(hashmap).sort((a, b) => b[1] - a[1]);
  const sortedLikes = Object.entries(totalLikes).sort((a, b) => b[1] - a[1]);



  let rankNumber = 1;
  let rankLikes = 1;

  if (buttons.length === 0 || !users.length === 0) {
    return <div><Loader /></div>;
  }

  return (
    <>

      <div className={classes.header}>
        <h1 className={classes.leaderboard_text}>LEADERBOARD</h1>
        <div className={classes.dropdown}>
          <button className={classes.dropbtn} onClick={() => setDropdown(!dropdown)}>Sort By</button>
          {dropdown && <div className={classes.dropdown_content}>
            <button className={classes.content_btn} onClick={() => { setCurrentList('buttons'); setDropdown(false) }}>Buttons</button>
            <button className={classes.content_btn} onClick={() => { setCurrentList('likes'); setDropdown(false) }}>Likes</button>
          </div>}
        </div>
      </div>







      <div className={classes.list}>
        {
          currentList === 'buttons' ?

            (<div className={classes.leaderboard}>
              <h2 className={classes.category}>Based On Number Of Buttons</h2>
              {sortedUsers.map(([name, count], index) => (
                <Link to={`/user/${name}`} key={index} className={classes.item}>
                  <span className=
                    {classes.rank}>{rankNumber++ + "."}</span>
                  <img src={getProfilePicture(name)} alt="Profile" className={classes.profileImage} />
                  <div className={classes.details}>
                    <div className={classes.name}>{name}</div>
                    <div className={classes.count}>{count} buttons added</div>
                  </div>
                </Link>
              ))}
            </div >)

            :

            (<div className={classes.leaderboard}>
              <h2 className={classes.category}>Based On Number Of Likes</h2>
              {sortedLikes.map(([name, count], index) => (
                <Link to={`/user/${name}`} key={index} className={classes.item}>
                  <span className=
                    {classes.rank}>{rankLikes++ + "."}</span>
                  <img src={getProfilePicture(name)} alt="Profile" className={classes.profileImage} />
                  <div className={classes.details}>
                    <div className={classes.name}>{name}</div>
                    <div className={classes.count}>Total Likes : {count} </div>
                  </div>
                </Link>
              ))}
            </div>)
        }
      </div >
    </>
  );
};

export default Score;
