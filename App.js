import React, {useState} from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import CameraComponent from './components/CameraComponent.js';

import axios from 'axios'
import { Camera } from 'expo-camera';
//API key is located on the .env file
const { API_KEY } = process.env;

// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Facegify!</Text>
      {/* <Text style={styles.instructions}>{instructions}</Text> */}
      <CameraComponent/>
      <Button
         onPress={null}
         title="Scan"
         color="#841584"
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
