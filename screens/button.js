import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
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

const CustButton = (props) => {
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


    const buttonWidth = props.width;
    const rightMargin = props.rightMargin;
    const height = props.height ?  props.height : 50;
    return (
                <Pressable android_ripple={{color:'#ffffff'}} style={[styles.pressableButton,{width:buttonWidth,marginRight:rightMargin,height:height}]} onPress={props.onPressFunction}>
                  <Text style={styles.loginText}>{props.title}</Text>
                </Pressable>
                 )
                }
              
const styles = StyleSheet.create({
   
      pressableButton:{
        backgroundColor:"#ffffff",
        alignItems: 'center',
        justifyContent:'center',
        height:50,
        borderRadius:8
      },
      loginText:{
        fontFamily:'Lato_400Regular',
        fontWeight:'bold',
        color:"#191820",
        elevation: 10,
      },
  });


export default CustButton;