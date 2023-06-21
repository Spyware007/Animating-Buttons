import React, {useState, useEffect} from "react";
import {db} from '../../../firebase/auth';
import { doc, getDocs, query, collection, where } from "firebase/firestore";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import LikeButton from "../LikeButton/LikeButton";

import downloadZip from "../../../Functions/DownloadZip";
// import ViewsIcon from "../ViewsIcon/ViewsIcon";

const Card = ({ autoid,button }) => {
  // console.log(autoid);
  const user = button.githubUsername;
  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (button.githubUsername) {
          const q = query(collection(db, "users"), where("username", "==", button.githubUsername));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const { profilePictureUrl } = userData;
            setProfilePicture(profilePictureUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [button.githubUsername]);
  
  return (
    <>
      <div className={classes.card_container}>
        <iframe
          className={classes.iframe_container}
          title={autoid}
          srcDoc={`
            <html>
              <head>
                <style>${button.css}</style>
              </head>
              <body>
                ${button.html}
                <script>${button.js}</script>
              </body>
            </html>
          `}
          sandbox="allow-scripts"
        ></iframe>

        <div className={classes.contributor_info}>
          <div className={classes.contributor_data}>
            <div className={classes.contributor_img_container}>
              <img
                className={classes.contributor_img}
                src={profilePicture}
                alt="Spyware007"
              />
            </div>
            <Link
              to={`/user/${button.githubUsername}`}
              className={classes.contributor_name}
            >
              {user}
            </Link>
          </div>
          <div className={classes.btns_container}>
            <Link to={`/show/${autoid}`}>
              <Button show={true} />
            </Link>
            <Button onClick={() => downloadZip(button)} />
          </div>
        </div>
        <div className={classes.stats_btn}>
          {/* <ViewsIcon /> */}
          <LikeButton  autoid={autoid}/>
        </div>
      </div>
    </>
  );
};

export default Card;

//prev code
// const Card = ({ button = "hello_1" }) => {
//   const user = button.split("_")[0];
//   console.log(button);
//   return (
//     <>
//       <div className={classes.card_container}>
//         <iframe
//           className={classes.iframe_container}
//           title={button}
//           src={`Buttons/${button}/index.html`}
//           sandbox="allow-scripts"
//         ></iframe>

//         <div className={classes.contributor_info}>
//           <div className={classes.contributor_data}>
//             <div className={classes.contributor_img_container}>
//               <img
//                 className={classes.contributor_img}
//                 src="https://avatars.githubusercontent.com/u/76893714?v=4"
//                 alt="Spyware007"
//               />
//             </div>
//             <Link to={`/user/${user}`} className={classes.contributor_name}>
//               {user}
//             </Link>
//           </div>
//           <div className={classes.btns_container}>
//             <Link to={`/show/${button}`}>
//               <Button show={true} />
//             </Link>
//             <Button onClick={() => downloadZip(button)} />
//           </div>
//         </div>
//         <div className={classes.stats_btn}>
//           {/* <ViewsIcon /> */}
//           <LikeButton />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Card;