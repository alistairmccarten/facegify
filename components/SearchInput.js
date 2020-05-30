import React, { useState } from 'react';
import {
  TextInput,
  Button,
  FlatList,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
// const {API_KEY} = process.env

export default function SearchInput() {
  const [value, onChangeText] = useState('');
  const [items, setItems] = useState([]);
  const API_KEY = 'Kv4DDMUg9mtiFDMdC2g5eqMqhMX0ciGE';

  const giphySearch = async () => {
    try {
      let res = await axios.get(
        'https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${value}&limit=10'
      );
      //   imgArr.push(res.data.data);
      setItems(items.concat(res.data.data));
      debugger;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <Image key={item.id} source={item.url} />}
        keyExtractor={(index) => {
          return index;
        }}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button
        onPress={() => {
          giphySearch(value);
        }}
        title="click"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
