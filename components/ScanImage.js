import { Alert } from "react-native";
import axios from 'axios';

export default function ProcessImage(image) {
  let url = "";
  let mood = "";
    // Upload image
    axios({
        method: 'post',
        url: 'https://api.imgur.com/3/upload?client_id=e070e1d06fa999f',
        data: {
          image: image
        }
      })
      .then((response) => {
        url = response.data.data.link;
        // console.log(url);
      }, (error) => {
        console.log(error);
      }).finally(() => {
        console.log(url);
        RequestSkyBiometry(url);
      });


      // Request SkyBiometry API
      function RequestSkyBiometry(url) {
        axios({
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
        })
        .then((response) => {
          mood = response.data.photos[0].tags[0].attributes.mood.value;
          console.log(mood);
        }, (error) => {
          console.log(error);
        }).finally(() => {
          Alert.alert("Output", mood); // 
        });
      }
      
      // Delete image
}