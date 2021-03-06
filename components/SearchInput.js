import React, { useState, useEffect } from "react";
import { TextInput, Button, FlatList, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { NativeModules } from 'react-native';
import * as FileSystem from 'expo-file-system';
// const {API_KEY} = process.env

export default function SearchInput({ mood }) {
  console.log('In SearhInput Compinent looking for:', mood);
  const [items, setItems] = useState([])
  const API_KEY = "Kv4DDMUg9mtiFDMdC2g5eqMqhMX0ciGE";
  const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
  const LIMIT = 10;

  useEffect(() => {
    const giphySearch = async () => {
      try {
        console.log('Fetching gifs:', mood);
        const apiCall = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${mood}`);
        let res = await apiCall.json();
        setItems(res.data);
        debugger
      } catch (error) {
        console.log(error);
      }
    };
    giphySearch();
  }, []);
  // const onEdit = (str) =>{
  //   onChangeText(str);
  //   giphySearch();
  // }
  return (
    <View style={styles.container}>
      {/* <TextInput
      placeholder="Enter your giphy"
      placeholderTextColor='#fff'
      style={styles.textInput}
        onChangeText={(text) => onEdit(text)}
      /> */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> copyToClipboard(item.images.original.url)}>
            <Image style={styles.image} key={item.id} source={{ url: item.images.original.url }}/>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function copyToClipboard(url) {
  // const getImage = async() => {
  //   let localUri = null;
  //   try {
  //     localUri = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'name.ext');
  //   } catch(e) {
  //       console.log(e);
  //   }
  //   return localUri;
  // }
  // function readFile(fileLocation) {
  //   let base64 = FileSystem.readAsStringAsync(fileLocation, 'base64');
  //   console.log(base64);
  //   // NativeModules.BetterClipboard.addBase64Image(base64);
  // }

  // let file = "";
  // let base64 = "";
  // Promise.resolve().then(()=> {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       file = getImage();
  //       console.log('done 1');
  //       console.log(file)
  //       resolve();
  //     }, 1000);
  //   });
  // }).finally(() => {
  //   base64 = readFile(file);
  //   console.log('done 2');
  // }).then(() => {
  //   console.log(base64);
  // });
  
  // const { uri: localUri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'name.ext');
  // let base64 = FileSystem.readAsStringAsync(localUri, 'base64');
  // console.log(base64);
  // NativeModules.BetterClipboard.addBase64Image(base64);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'black'
  },
  image: {
    width: 300,
    height: 150,
    borderWidth: 3,
    marginBottom: 5
  }

});