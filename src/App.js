import Views from './views';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'rc-rate/assets/index.css';

import { useEffect } from 'react';

const DBConfig = {
  apiKey: process.env.REACT_APP__FIREBASE_API,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

function App() {
  useEffect(() => {
    initializeApp(DBConfig);
  }, [])
  return (
    <Router>
      <Switch>
        <Views />
      </Switch>
    </Router>
  );
}

export default App;
