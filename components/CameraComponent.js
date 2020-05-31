import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
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
    result = await RequestSkyBiometry(url);

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
      return detectedMood;
    }

    console.log("Mood detection complete. result:", result);
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
        ref={(ref) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={async () => {
              if (cameraRef) {
                console.log('Capturing photo...');
                let photo = await cameraRef.takePictureAsync({ quality: 0.5, base64: true });
                console.log('Captured photo');
                console.log('processing image');
                let mood = await ProcessImage(photo.base64);
                console.log('processed image');
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
