import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

//style
import styles from './assets/src/styles/GlobalStyles'

import firebase from './assets/src/utils/firebase';
import 'firebase/auth';

import Auth from './assets/src/components/Auth';


export default function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() =>{
    firebase.auth().onAuthStateChanged((Response) => {
      setUser(Response);
    });

  },[]);

  if (user === undefined) return null;

  return (
    <View style={[styles.container, styles.styeContainer]}>
      { user? <Text>hola</Text>: <Auth/> }
    </View>
  );
}