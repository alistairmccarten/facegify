import React, { useState } from "react";
import { TextInput, Button, FlatList, View, StyleSheet, Image } from "react-native";
import axios from "axios";
// const {API_KEY} = process.env

export default function SearchInput({ photo }) {
  const [value, onChangeText] = useState("");
  const [items, setItems] = useState([])
  const API_KEY = "Kv4DDMUg9mtiFDMdC2g5eqMqhMX0ciGE";
  const BASE_URL = 'http://api.giphy.com/v1/gifs/search';

  const giphySearch = async () => {
    try {
      const apiCall = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${value}`);
      let res = await apiCall.json();
      setItems(res.data);
      debugger
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (str) => {
    onChangeText(str);
    giphySearch();
  }

  return (
    <View style={styles.container}>
      {/* <TextInput
        placeholder="Enter your giphy"
        placeholderTextColor='#fff'
        style={styles.textInput}
        onChangeText={(text) => onEdit(text)}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Image style={styles.image} key={item.id}
            source={{ url: item.images.original.url }} />
        )}
      /> */}
      <Image style={{ flex: 1 }}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderWidth: 1,
  },
  image: {
    width: 300,
    height: 150,
    borderWidth: 3,
    marginBottom: 5
  }
});