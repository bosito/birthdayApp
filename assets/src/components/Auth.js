import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

//style
import styles from '../styles/GlobalStyles'



export default function Auth() {
  return (
    <View style={[styles.container, styles.styeContainer]}>
      <Text>hola Auth</Text>
    </View>
  );
}