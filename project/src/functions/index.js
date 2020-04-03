import React, { Component } from 'react';
//Import React
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
//Import basic component from React Native
import Slider from '@react-native-community/slider';
//Import slider for the tuning of pitch and speed
import Tts from 'react-native-tts';
//Import library for Text to Speech

class Speaking{ 

   
    state = {
        voices: [],
        ttsStatus: 'initiliazing',
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: 'Buenos dias',

      };

    OnSpeak =()=>{
        
        Tts.speak(this.state.text, 
            {
                language :'es',
                pitch:1,
                rate:0.5,
            })
    }
}

export default new Speaking
