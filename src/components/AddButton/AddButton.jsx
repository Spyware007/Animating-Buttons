import { useState, useEffect } from 'react';
import classes from './AddButton.module.css';
import { useParams } from 'react-router-dom';
import CodeEditor from '../common/CodeEditor/CodeEditor';
import { htmlTemplate, cssTemplate, jsTemplate } from './templates';
import { auth, db } from '../../firebase/auth'; // Import the db and signInWithGitHub from auth.js
import { collection, addDoc } from 'firebase/firestore'; // Import the collection and addDoc functions
import axios from 'axios';

const AddButton = () => {
  const [html, setHtml] = useState(htmlTemplate);
  const [css, setCss] = useState(cssTemplate);
  const [js, setJs] = useState(jsTemplate);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);



  const saveButtonToFirestore = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to add a button.');
      return;
    }
  
    const buttonCollectionRef = collection(db, 'buttons');
  
    const buttonData = {
      html,
      css,
      js,
      likeCounter: 0,
      githubUsername: '',
      displayName: '',
      likedUsers: [],
    };
  
    try {
      const githubId = user.providerData.find((provider) => provider.providerId === 'github.com').uid;
      const response = await axios.get(`https://api.github.com/user/${githubId}`);
      console.log(response);
      const { login } = response.data;
      buttonData.username = login;

  
      const docRef = await addDoc(buttonCollectionRef, buttonData);
      console.log('Button document saved with ID:', docRef.id);
  
      window.location.reload();
    } catch (error) {
      console.error('Error adding button document:', error);
    }
  };
  



  return (
    <div className={classes.editor_container}>
      <div className={classes.iframe_container}>
        <iframe
          className={classes.container}
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
        />
      </div>
      <div className={classes.components_container}>
        <CodeEditor
          html={html}
          setHtml={setHtml}
          css={css}
          setCss={setCss}
          js={js}
          setJs={setJs}
        />
        <button className={classes.blue_button} onClick={saveButtonToFirestore} >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddButton;