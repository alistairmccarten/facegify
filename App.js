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
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import CameraComponent from './components/CameraComponent.js';
import SearchInput from "./components/SearchInput";

import axios from 'axios';
import { Camera } from 'expo-camera';
//API key is located on the .env file
const { API_KEY } = process.env;

export default function App() {
  const [state, setState] = useState({});

  let [fontsLoaded] = useFonts({
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
  });

  return fontsLoaded ? (
    <View style={styles.container}>
      {/* <Text style={styles.instructions}>{instructions}</Text> */}
      <Text style={styles.wordmark}>Facegify</Text>
      <Text style={styles.subtext}>Built using Giphy</Text>
      {state.mood ? (
        <SearchInput mood={state.mood} />
      ) : (
          <CameraComponent setState={setState} />
        )}
      <TouchableOpacity style={styles.btnScan} onPress={() => setState({})}>
        <MaterialCommunityIcons name='reload' size={32} color='#841584' />
        <Text style={styles.btnScanText}>Refresh</Text>
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
    alignContent: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  btnScanText: {
    paddingLeft: 12,
    color: '#841584',
    textAlignVertical: 'center',
  },
});
