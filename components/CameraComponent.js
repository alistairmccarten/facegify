import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import ProcessImage from './ScanImage.js';
import axios from 'axios';

export default function CameraComponent({ setState }) {
  console.log('In CameraComponent');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  let mood = '';

  async function ProcessImage(image) {
    let url = "";
    let result = '';
    // Upload image
    let response = await axios({
      method: 'post',
      url: 'https://api.imgur.com/3/upload?client_id=e070e1d06fa999f',
      data: {
        image: image
      }
    })
    url = response.data.data.link;

    console.log('url:', url);
    result = await RequestSkyBiometry(url);
    console.log('Mood detection complete:', result);

    // Request SkyBiometry API
    async function RequestSkyBiometry(url) {
      let detectedMood = '';

      let response = await axios({
        method: 'post',
        url: 'http://api.skybiometry.com/fc/faces/detect.json?api_key=aga3bi7pffiqcnd23ba41b223h&api_secret=ldem5ovcj3np4m6m83mkohtqgj&urls=' +
          url +
          '&attributes=mood',
        data: {
          api_key: 'aga3bi7pffiqcnd23ba41b223h',
          api_secret: 'ldem5ovcj3np4m6m83mkohtqgj',
          urls: url,
          attributes: 'mood'
        }
      });
      detectedMood = response.data.photos[0].tags[0].attributes.mood.value;
      console.log('detectedMood:', detectedMood);
      return detectedMood;
    }

    console.log("Detection result:", result);
    return result;
  };


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        useCamera2Api={true}
        // docs.expo.io/versions/latest/sdk/facedetector/#event-shape
        // onFacesDetected={}; add faces[] into the state
        // the data from this detection might be useful for detection APIs
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        ref={(ref) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          {/* Flip camera button */}
          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={async () => {
              if (cameraRef) {
                console.log('Capturing photo...');
                let photo = await cameraRef.takePictureAsync({ quality: 0.5, base64: true });
                let mood = await ProcessImage(photo.base64);
                // console.log('photo:', photo);
                console.log('mood state set to:', mood);
                setState(s => ({ ...s, photo, mood}));
              }
            }}>
            {/* <View
              style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: 'white',
                height: 50,
                width: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View
                style={{
                  borderRadius: 40,
                  borderColor: 'white',
                  height: 40,
                  width: 40,
                  backgroundColor: 'white',
                }}></View>
            </View> */}
            <MaterialCommunityIcons name='circle-slice-8' size={64} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
