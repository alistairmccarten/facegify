import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import CameraComponent from './components/CameraComponent.js';
import SearchInput from "./components/SearchInput";

import axios from 'axios';
import { Camera } from 'expo-camera';
//API key is located on the .env file
const { API_KEY } = process.env;

export default function App() {
  const [state, setState] = useState({});
  const [mood, setMood] = useState({});

  let [fontsLoaded] = useFonts({
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
  });

  return fontsLoaded ? (
    <View style={styles.container}>
      {/* <Text style={styles.instructions}>{instructions}</Text> */}
      <Text style={styles.wordmark}>Facegify</Text>
      <Text style={styles.subtext}>Built using Giphy</Text>
      {state.photo ? (
        <SearchInput photo={state.photo} mood={mood} />
      ) : (
          <CameraComponent setState={setState} setMood={setMood} />
        )}
      <TouchableOpacity style={styles.btnScan}>
        <Text style={styles.btnScanText}>Scan</Text>
      </TouchableOpacity>
    </View>
  ) : (<AppLoading />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  btnScan: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,

  },
  btnScanText: {
    color: '#841584',
  },
});
