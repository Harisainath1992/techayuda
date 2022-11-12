import React from 'react';
import {
    TextInput,
    StyleSheet,
  } from 'react-native';
  import {
    useFonts,
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  } from '@expo-google-fonts/lato';
const CustInput = (props) => {
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });
    const textWidth = props.width;
    const placeholder = props.placeholder;
    const secure = props.secure;
    const multiline = props.multiline;
    const numberOfLines= props.numberOfLines;
    const height = props.height
    return (
                    <TextInput
                    style={[styles.input,{width:textWidth,height:height}]}
                    placeholder={placeholder}
                    placeholderTextColor={'#ebedef8a'}
                    secureTextEntry={secure}
                    multiline ={multiline}
                    numberOfLines = {numberOfLines}
                />
                 )
                }
              
const styles = StyleSheet.create({
   
    input: {
        margin: 8,
        borderWidth: 1,
        padding: 10,
        borderColor:'#2e2d35',
        color:"#ffffff",
        fontFamily:'Lato_400Regular',
        fontWeight:'600',
        borderRadius:10,
        backgroundColor:'#1e1d25'
      },
  });


export default CustInput;