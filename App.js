import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import CameraComponent from './components/CameraComponent.js';
import SearchInput from "./components/SearchInput";

import axios from 'axios';
import { Camera } from 'expo-camera';
//API key is located on the .env file
const { API_KEY } = process.env;

// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
  });
  
  return fontsLoaded ? (
    <View style={styles.container}>
      {/* <Text style={styles.instructions}>{instructions}</Text> */}
      <Text style={styles.wordmark}>Facegify</Text>
      <Text style={styles.subtext}>Built using Giphy</Text>
      <CameraComponent />
      <Button onPress={null} title="Scan" color="#841584" />
    </View>
  ) : (<AppLoading />);
}

function search() {
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  custom: {
    fontFamily: 'Lobster',
    fontSize: 32,
  },
  wordmark: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFF',
    fontFamily: 'Lobster',
  },
  subtext: {
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 5,
  },
});
