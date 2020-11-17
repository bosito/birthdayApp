import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox  } from 'react-native';
import {decode, encode} from 'base-64'

//style
import styles from './assets/src/styles/GlobalStyles'

import firebase from './assets/src/utils/firebase';
import 'firebase/auth';

//components
import Auth from './assets/src/components/Auth';
import ListCumpleaños from './assets/src/components/ListCumpleaños';

export default function App() {

  if(!global.btoa) global.btoa = encode;
  if(!global.atob) global.atob = decode;

  //LogBox.ignoreLogs(["Warning: Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. "]);

  const [user, setUser] = useState(undefined);

  useEffect(() =>{
    firebase.auth().onAuthStateChanged((Response) => {
      setUser(Response);
    });

  },[]);

  if (user === undefined) {
    return (
      <View style={[styles.containerOpcion, styles.styeContainer,]}>
        <Image source={require('./assets/img/waring.png')} style={[styles.image, {height: 350,}]} />
        <Text style={styles.text} >Comprueba tu coneccion a internet</Text>
      </View>
    );

  } else {

    return (
      <View style={[styles.container, styles.styeContainer]}>
        { user? <ListCumpleaños user={user} />: <Auth/> }
      </View>
    );

  }
}